import { createSlice } from "@reduxjs/toolkit";
import hierarchyData from "../data/companyData";
import { flattenHierarchy } from "../utils/getTeams";


const loadFromLocalStorage = (key, defaultValue) => {
  const storedData = localStorage.getItem(key);
  return storedData ? JSON.parse(storedData) : defaultValue;
};

const saveToLocalStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

// Initial state
const initialState = {
  visibilityMap: loadFromLocalStorage("visibilityMap", {}),
  modalData: null,
  isModalOpen: false,
  isEditTeamMemberModalOpen: false,
  filteredData: loadFromLocalStorage("filteredData", hierarchyData),
  hierarchyData: loadFromLocalStorage("hierarchyData", hierarchyData),
  localStorageKey: "teamMembers",
  teamMembers: loadFromLocalStorage("teamMembers", []),
  employees: loadFromLocalStorage("employees", []),
};

const addMemberToData = (data, teamId, newMember) => {
  data.children.forEach((department) => {
    department.children.forEach((team) => {
      if (team.id === teamId) {
        team.children.push(newMember);
      }
    });
  });
};

const removeMemberFromCurrentTeam = (data, memberId) => {
  data.children.forEach((department) => {
    department.children.forEach((team) => {
      team.children = team.children.filter((member) => member.id !== memberId);
    });
  });
};

function addMemberToNewTeam(hierarchyData, newTeamId, member) {
  
  for (const department of hierarchyData.children) {
    for (const team of department.children) {
      if (team.id === newTeamId) {
        team.children.push(member); 
        return;
      }
    }
  }
}

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
      .map((department) => ({
        ...department,
        children: department.children
          .map((team) => ({
            ...team,
            children: team.children.filter(
              (member) =>
                (member.employee || "")
                  .toLowerCase()
                  .includes(lowerCaseFilters.name) &&
                (member.phone || "").includes(phone) &&
                (member.email || "")
                  .toLowerCase()
                  .includes(lowerCaseFilters.email)
            ),
          }))
          .filter((team) => team.children.length > 0),
      }))
      .filter((department) => department.children.length > 0),
  };
};

// Slice
const hierarchySlice = createSlice({
  name: "hierarchy",
  initialState,
  reducers: {
    toggleVisibility(state, action) {
      const key = action.payload;
      state.visibilityMap[key] = !state.visibilityMap[key];
      saveToLocalStorage("visibilityMap", state.visibilityMap);
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
        ...state.hierarchyData,
        children: state.hierarchyData.children.map((department) => ({
          ...department,
          children: department.children.map((team) => ({
            ...team,
            children: [
              ...team.children,
              ...state.teamMembers.filter(
                (member) => member.teamId === team.position
              ),
            ],
          })),
        })),
      };
      const filtered = filterData(originalData, action.payload);
      state.filteredData =
        filtered.children.length > 0 ? filtered : originalData;
      saveToLocalStorage("filteredData", state.filteredData);
    },

    addTeamMember(state, action) {
      const newMember = action.payload;
      const newMemberData = {
        id: `${Date.now()}-${Math.floor(Math.random() * 100)}`,
        position: "Team Member",
        employee: newMember.name,
        phone: newMember.phone,
        email: newMember.email,
      };

      state.teamMembers.push(newMemberData);
      saveToLocalStorage(state.localStorageKey, state.teamMembers);

      state.employees.push({
        id: newMemberData.id,
        teamId: newMember.teamId,
        department: newMember.department,
        ...newMemberData,
      });

      const teamId = newMember.teamId;
      addMemberToData(state.filteredData, teamId, newMemberData);
      addMemberToData(state.hierarchyData, teamId, newMemberData);

      saveToLocalStorage("filteredData", state.filteredData);
      saveToLocalStorage("hierarchyData", state.hierarchyData);
    },
    updateTeamMember(state, action) {
      const { id, ...updatedData } = action.payload;

      const updateMemberInData = (data) => {
        data.children.forEach((department) => {
          department.children.forEach((team) => {
            team.children.forEach((member, index) => {
              if (member.id === id) {
                team.children[index] = { ...member, ...updatedData };
              }
            });
          });
        });
      };

     
      updateMemberInData(state.filteredData);
      updateMemberInData(state.hierarchyData);

     
      saveToLocalStorage("filteredData", state.filteredData);
      saveToLocalStorage("hierarchyData", state.hierarchyData);
    },

    deleteTeamMemberSlice(state, action) {
      const memberIdToDelete = action.payload;
      const updatedMembers = state.teamMembers.filter(
        (member) => member.employee !== memberIdToDelete
      );

      const removeMemberFromData = (data) => {
        data.children.forEach((department) => {
          department.children.forEach((team) => {
            team.children = team.children.filter(
              (member) => member.employee !== memberIdToDelete
            );
          });
        });
      };

      removeMemberFromData(state.filteredData);
      removeMemberFromData(state.hierarchyData);

      state.teamMembers = updatedMembers;
      saveToLocalStorage(state.localStorageKey, updatedMembers);
      saveToLocalStorage("filteredData", state.filteredData);
      saveToLocalStorage("hierarchyData", state.hierarchyData);
    },
    changedTeam(state, action) {
      const { id, newTeamId, department } = action.payload;

      if (!id) {
        return;
      }

      console.log(`Searching for Employee ID: ${id}`);

      const flattenedEmployees = flattenHierarchy(state.hierarchyData);
      console.log(
        "Flattened Employees:",
        JSON.stringify(flattenedEmployees, null, 3)
      );

      const employee = flattenedEmployees.find((emp) => emp.id === id);
      if (employee) {
        const originalEmployee = state.employees.find((emp) => emp.id === id);
        if (originalEmployee) {
          removeMemberFromCurrentTeam(state.hierarchyData, id);

          originalEmployee.teamId = newTeamId;
          originalEmployee.department = department;

          addMemberToNewTeam(state.hierarchyData, newTeamId, originalEmployee);

          saveToLocalStorage("hierarchyData", state.hierarchyData);
          saveToLocalStorage(state.localStorageKey, state.teamMembers);
          saveToLocalStorage("employees", state.employees);

          console.log(`Employee with ID ${id} moved to Team ${newTeamId}.`);
        } else {
          console.error(
            `Original employee with ID ${id} not found in state.employees.`
          );
        }
      } else {
        console.error(
          `Employee with ID ${id} not found in flattened hierarchy.`
        );
      }
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
  updateTeamMember,
  deleteTeamMemberSlice,
  changedTeam,
} = hierarchySlice.actions;

export default hierarchySlice.reducer;
