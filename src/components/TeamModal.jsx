// TeamModal.js
import React from "react";
import { Modal } from "antd";
import Employee from './Employee';

const TeamModal = ({ visible, onClose, team }) => {
  return (
    <Modal
      title={`${team.position} - Members`}
      open={visible}
      onCancel={onClose}
      footer={null}
    >
      <ul>
        {team.children && team.children.map((member, index) => (
          <Employee key={index} employee={member} />
        ))}
      </ul>
    </Modal>
  );
};

export default TeamModal;
