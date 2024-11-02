// src/components/DeleteMember.jsx
import React from "react";
import { Modal, List, Button } from "antd";

const DeleteMember = ({ teamMembers, onRemove, onClose }) => {
  return (
    <Modal
      title="Delete Team Members"
      open={true}
      onCancel={onClose}
      onClose={onClose}
    >
      <List
        bordered
        dataSource={teamMembers}
        renderItem={(member) => (
          <List.Item>
            {member.name}
            <Button
              type="primary"
              danger
              onClick={() => {
                onRemove(member.id);
              }}
              style={{
                marginLeft: "1rem",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
              >
                <path
                  fill="white"
                  d="M7.5 1h9v3H22v2h-2.029l-.5 17H4.529l-.5-17H2V4h5.5zm2 3h5V3h-5zM6.03 6l.441 15h11.058l.441-15zM13 8v11h-2V8z"
                ></path>
              </svg>
            </Button>
          </List.Item>
        )}
      />
    </Modal>
  );
};

export default DeleteMember;