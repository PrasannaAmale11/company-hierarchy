import { createSlice } from '@reduxjs/toolkit';
import hierarchyData from '../data/companyData';

// Utility functions
const loadFromLocalStorage = (key, defaultValue) => {
  const storedData = localStorage.getItem(key);
  return storedData ? JSON.parse(storedData) : defaultValue;
};

const saveToLocalStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

// Initial state
const initialState = {
  visibilityMap: loadFromLocalStorage('visibilityMap', {}),
  modalData: null,
  isModalOpen: false,
  isEditTeamMemberModalOpen: false,
  filteredData: loadFromLocalStorage('filteredData', hierarchyData),
  localStorageKey: 'teamMembers',
  teamMembers: loadFromLocalStorage('teamMembers', []),
};

// Helper function to add a member to data structure
const addMemberToData = (data, position, newMember) => {
  data.children.forEach(department => {
    department.children.forEach(team => {
      if (team.position === position) {
        team.children.push(newMember);
      }
    });
  });
};

// Helper function to filter data
const filterData = (data, filters) => {
  const { name, phone, email } = filters;
  const lowerCaseFilters = {
    name: name.toLowerCase(),
    email: email.toLowerCase(),
  };

  return {
    ...data,
    children: data.children
      .map(department => ({
        ...department,
        children: department.children
          .map(team => ({
            ...team,
            children: team.children.filter(member => (
              (member.employee || '').toLowerCase().includes(lowerCaseFilters.name) &&
              (member.phone || '').includes(phone) &&
              (member.email || '').toLowerCase().includes(lowerCaseFilters.email)
            )),
          }))
          .filter(team => team.children.length > 0),
      }))
      .filter(department => department.children.length > 0),
  };
};

// Slice
const hierarchySlice = createSlice({
  name: 'hierarchy',
  initialState,
  reducers: {
    toggleVisibility(state, action) {
      const key = action.payload;
      state.visibilityMap[key] = !state.visibilityMap[key];
      saveToLocalStorage('visibilityMap', state.visibilityMap);
    },
    openModal(state, action) {
      state.modalData = action.payload;
      state.isModalOpen = true;
    },
    closeModal(state) {
      state.isModalOpen = false;
      state.modalData = null;
    },
    openEditTeamMemberModal(state, action) {
      state.isEditTeamMemberModalOpen = true;
      state.modalData = action.payload;
    },
    closeEditTeamMemberModal(state) {
      state.isEditTeamMemberModalOpen = false;
    },
    filterEmployees(state, action) {
      const originalData = {
        ...hierarchyData,
        children: hierarchyData.children.map(department => ({
          ...department,
          children: department.children.map(team => ({
            ...team,
            children: [
              ...team.children,
              ...state.teamMembers.filter(member => member.teamId === team.position),
            ],
          })),
        })),
      };
      const filtered = filterData(originalData, action.payload);
      state.filteredData = filtered.children.length > 0 ? filtered : originalData;
      saveToLocalStorage('filteredData', state.filteredData);
    },
    addTeamMember(state, action) {
      const newMember = action.payload;
      const newMemberData = {
        position: 'Team Member',
        employee: newMember.name,
        phone: newMember.phone,
        email: newMember.email,
      };

      state.teamMembers.push(newMember);
      saveToLocalStorage(state.localStorageKey, state.teamMembers);

      const position = state.modalData?.position;
      addMemberToData(state.filteredData, position, newMemberData);
      addMemberToData(hierarchyData, position, newMemberData);

      saveToLocalStorage('filteredData', state.filteredData);
      saveToLocalStorage('hierarchyData', hierarchyData);
    },
    deleteTeamMemberSlice(state, action) {
      const memberIdToDelete = action.payload;
      const updatedMembers = state.teamMembers.filter(member => member.employee !== memberIdToDelete);

      const removeMemberFromData = (data) => {
        data.children.forEach(department => {
          department.children.forEach(team => {
            team.children = team.children.filter(member => member.employee !== memberIdToDelete);
          });
        });
      };

      removeMemberFromData(state.filteredData);
      removeMemberFromData(hierarchyData);

      state.teamMembers = updatedMembers;
      saveToLocalStorage(state.localStorageKey, updatedMembers);
      saveToLocalStorage('filteredData', state.filteredData);
    },
    
  },
});

export const {
  toggleVisibility,
  openModal,
  closeModal,
  openEditTeamMemberModal,
  closeEditTeamMemberModal,
  filterEmployees,
  addTeamMember,
  deleteTeamMemberSlice,
} = hierarchySlice.actions;

export default hierarchySlice.reducer;