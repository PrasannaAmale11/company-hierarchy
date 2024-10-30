import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "antd";
import AddMemberForm from "./AddMemberForm";
import DeleteMember from "./DeleteMember";
import { getAllEmployees } from "../utils/getEmployee";
import { useDispatch } from "react-redux";
import { deleteTeamMemberSlice } from "../slices/hierarchySlice";
import ChangeTeamNameModal from "./ChangeTeamNameModal";

const EditTeamMemberModal = ({ isVisible, onClose, onAdd, modalData }) => {
  const dispatch = useDispatch();
  const [addTeamMemberVisible, setAddTeamMemberVisible] = useState(false);
  const [deleteTeamMemberVisible, setDeleteTeamMemberVisible] = useState(false);
  const [form] = Form.useForm();
  const [teamMembers, setTeamMembers] = useState(getAllEmployees(modalData));
  const [changeTeamNameVisible, setChangeTeamNameVisible] = useState(false);

  useEffect(() => {
    setTeamMembers(getAllEmployees(modalData));
  }, [modalData]);

  const handleAddMember = (newMember) => {
    const teamData = {
      ...newMember,
      teamId: modalData.id,
    };
    onAdd(teamData);
    setAddTeamMemberVisible(false);
  };

  const handleRemoveMember = (memberId) => {
    const teamMemberCount = teamMembers.length;

    if (teamMemberCount > 1) {
      dispatch(deleteTeamMemberSlice(memberId));
      setTeamMembers((prevMembers) =>
        prevMembers.filter((member) => member.id !== memberId)
      );
      setDeleteTeamMemberVisible(false);
    } else {
      Modal.warning({
        title: "Cannot Delete Member",
        content: "At least one member must remain in the team.",
      });
    }
  };

  return (
    <Modal
      title="Edit Team Members"
      open={isVisible}
      onCancel={onClose}
      footer={null}
    >
      <div
        style={{
          display: "inline-flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
          width: "100%",
        }}
      >
        <Button type="primary" onClick={() => setAddTeamMemberVisible(true)}>
          Add Member
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
          >
            <g fill="none">
              <path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"></path>
              <path
                fill="white"
                d="M16 14a5 5 0 0 1 5 5v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1a5 5 0 0 1 5-5zm4-6a1 1 0 0 1 1 1v1h1a1 1 0 1 1 0 2h-1v1a1 1 0 1 1-2 0v-1h-1a1 1 0 1 1 0-2h1V9a1 1 0 0 1 1-1m-8-6a5 5 0 1 1 0 10a5 5 0 0 1 0-10"
              ></path>
            </g>
          </svg>
        </Button>
        <Button
          type="primary"
          danger
          onClick={() => setDeleteTeamMemberVisible(true)}
        >
          Delete Member{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
          >
            <path
              fill="white"
              d="M17.5 12a5.5 5.5 0 1 1 0 11a5.5 5.5 0 0 1 0-11m-5.477 2A6.47 6.47 0 0 0 11 17.5c0 1.644.61 3.146 1.617 4.29q-1.203.212-2.617.211c-2.89 0-5.128-.656-6.69-2a3.75 3.75 0 0 1-1.306-2.844v-.907A2.25 2.25 0 0 1 4.254 14zm3.07.966l-.069.058l-.058.07a.5.5 0 0 0 0 .568l.058.07l1.77 1.769l-1.767 1.767l-.058.069a.5.5 0 0 0 0 .569l.058.069l.069.058a.5.5 0 0 0 .569 0l.069-.058l1.767-1.767l1.769 1.77l.069.057a.5.5 0 0 0 .569 0l.069-.058l.058-.07a.5.5 0 0 0 0-.568l-.058-.069l-1.77-1.77l1.773-1.768l.058-.07a.5.5 0 0 0 0-.568l-.058-.07l-.07-.057a.5.5 0 0 0-.568 0l-.07.057l-1.771 1.77l-1.77-1.77l-.069-.057a.5.5 0 0 0-.492-.044zM10 2.005a5 5 0 1 1 0 10a5 5 0 0 1 0-10"
            ></path>
          </svg>
        </Button>

        <Button type="primary" onClick={() => setChangeTeamNameVisible(true)}>
          Change Team Name
        </Button>

        {changeTeamNameVisible && (
          <ChangeTeamNameModal
            visible={changeTeamNameVisible}
            currentTeamName={teamName}
            onClose={() => setChangeTeamNameVisible(false)}
            onSave={handleSaveTeamName}
          />
        )}

        {addTeamMemberVisible && (
          <AddMemberForm
            form={form}
            teamName={modalData?.position}
            visible={addTeamMemberVisible}
            onClose={() => setAddTeamMemberVisible(false)}
            onOk={handleAddMember}
          />
        )}

        {deleteTeamMemberVisible && (
          <DeleteMember
            teamMembers={teamMembers}
            onRemove={handleRemoveMember}
            onClose={() => setDeleteTeamMemberVisible(false)}
          />
        )}
      </div>
    </Modal>
  );
};

export default EditTeamMemberModal;
