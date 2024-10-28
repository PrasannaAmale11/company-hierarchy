import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal } from "antd";
import Team from './Team';
import EmployeeFilter from './EmployeeFilter';
import Node from './Node'; 
import EditTeamMemberModal from './EditTeamMemberModal';
import {
  toggleVisibility,
  openModal,
  closeModal,
  openEditTeamMemberModal,
  closeEditTeamMemberModal,
  filterEmployees,
  addTeamMember,
  deleteTeamMemberSlice 
} from '../slices/hierarchySlice';

const Simple = () => {
  const dispatch = useDispatch();
  const { visibilityMap, modalData, isModalOpen, isEditTeamMemberModalOpen, filteredData, teamMembers } = useSelector(state => state.hierarchy);

  const handleToggleVisibility = (key) => dispatch(toggleVisibility(key));
  const handleOpenModal = (node) => node.children?.length && dispatch(openModal(node));
  const handleCloseModal = () => dispatch(closeModal());
  const handleCloseEditTeamMemberModal = () => dispatch(closeEditTeamMemberModal());
  const handleFilterEmployees = (filters) => dispatch(filterEmployees(filters));
  const handleAddTeamMember = (node) => dispatch(openEditTeamMemberModal(node));
  const handleAddMember = (newMember) => dispatch(addTeamMember(newMember));
  const handleRemoveMember = (memberId) => dispatch(deleteTeamMemberSlice(memberId));
  


  return (
    <div className="tree">
      <EmployeeFilter onFilter={handleFilterEmployees} />
      <ul>
        {filteredData && (
          <Node 
            node={filteredData} 
            visibilityMap={visibilityMap} 
            toggleVisibility={handleToggleVisibility} 
            openModal={handleOpenModal} 
            onAddTeamMember={handleAddTeamMember} 
          />
        )}
      </ul>

      <Modal
        title={`${modalData?.employee}'s ${modalData?.position} Department`}
        open={isModalOpen}
        onCancel={handleCloseModal}
        onOk={handleCloseModal}
      >
        <ul>
          {modalData?.children?.map((team, index) => (
            <Team key={index} team={team} />
          ))}
        </ul>
      </Modal>

      <EditTeamMemberModal 
        isVisible={isEditTeamMemberModalOpen} 
        onClose={handleCloseEditTeamMemberModal} 
        onAdd={handleAddMember} 
        modalData={modalData}
        teamMembers={teamMembers} 
        // onChangeTeamName={handleTeamNameChange}
      />
      
    </div>
  );
};

export default Simple;
