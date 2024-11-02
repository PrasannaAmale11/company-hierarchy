import React, { useEffect, useState } from "react";
import "./styles/simple.css";
import { MinusCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";
import EmployeeDetailModal from "./EmployeeDetailModal";
import { useDispatch } from "react-redux";
import { updateTeamMember } from "../slices/hierarchySlice";
import { Form, Modal } from "antd";
import Team from "./Team";
import ChangeTeam from "./ChangeTeam";
import { getAllDepartments, getAllTeams } from "../utils/getTeams";

const Node = ({
  node,
  visibilityMap,
  toggleVisibility,
  path = "",
  onAddTeamMember,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [employeeData, setEmployeeData] = useState({});
  const [isChangeTeamVisible, setChangeTeamVisible] = useState(false);


  const nodeKey = `${path}/${node.position}-${node.employee || ""}`;
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  useEffect(() => {
    if (isModalVisible) {
      setEmployeeData({
        employee: node.employee,
        position: node.position,
        phone: node.phone,
        email: node.email,
      });
    }
  }, [node, isModalVisible]);


  

  const isHeadOfDepartment =
    node.position === "Head of Staff/HR" ||
    node.position === "Head of Engineering" ||
    node.position === "Head of Design";

  const isTeam =
    node.position.startsWith("Team") &&
    !node.position.endsWith("Member") &&
    !node.position.endsWith("Leader");

  const isCEO = node.position === "CEO";
  const isEmployee =
    node.position.startsWith("Team") &&
    (node.position.endsWith("Member") || node.position.endsWith("Leader"));

  const openModal = () => {
    setEmployeeData({
      employee: node.employee,
      position: node.position,
      phone: node.phone,
      email: node.email,
    });
    setIsModalVisible(true);
  };

  const handleUpdate = (updatedData) => {
    const updatePayload = {
      id: node.id,
      position: node.position,
      employee: updatedData.employee,
      phone: updatedData.phone,
      email: updatedData.email,
    };
    dispatch(updateTeamMember(updatePayload));
    setIsModalVisible(false);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleOpenChangeTeam = () => {
    setChangeTeamVisible(true);
  };

  const handleCloseChangeTeam = () => {
    setChangeTeamVisible(false);
  };
  const handleChangeTeam = (newTeam) => {
    // Logic to change the employee's team
    console.log("Changed to team:", newTeam);
    // You can dispatch an action here if needed
    handleCloseChangeTeam(); // Close the ChangeTeam modal after the operation
  };

  

  return (
    <li key={nodeKey}>
      <div style={{ position: "relative" }}>
        <h2
          className="teamtitle"
          onClick={openModal}
          style={{ cursor: "pointer" }}
        >
          {node.employee || ""}
        </h2>
        <p className="positionTitle">{node.position}</p>
        {isEmployee && (
          <span className="editButton">
            <button className="btn" onClick={openModal}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
              >
                <g
                  fill="none"
                  stroke="white"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                >
                  <path d="M7 7H6a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-1"></path>
                  <path d="M20.385 6.585a2.1 2.1 0 0 0-2.97-2.97L9 12v3h3zM16 5l3 3"></path>
                </g>
              </svg>
            </button>

            <button className="btn" onClick={handleOpenChangeTeam}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
              >
                <path
                  fill="none"
                  stroke="white"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 5h10M5 5h.009M5 11.004h.009M5 17.007h.009M9 11.004h10M9 17.007h10m0 0c.003-.26-.18-.518-.404-.707l-1.602-1.274M19 17.007c-.003.252-.186.506-.404.708L16.994 19"
                  color="white"
                ></path>
              </svg>
            </button>
          </span>
        )}

        {isTeam && (
          <button className="addTeamMem" onClick={() => onAddTeamMember(node)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1.25em"
              height="1em"
              viewBox="0 0 640 512"
            >
              <path
                fill="white"
                d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0S96 57.3 96 128s57.3 128 128 128m89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h274.9c-2.4-6.8-3.4-14-2.6-21.3l6.8-60.9l1.2-11.1l7.9-7.9l77.3-77.3c-24.5-27.7-60-45.5-99.9-45.5m45.3 145.3l-6.8 61c-1.1 10.2 7.5 18.8 17.6 17.6l60.9-6.8l137.9-137.9l-71.7-71.7zM633 268.9L595.1 231c-9.3-9.3-24.5-9.3-33.8 0l-37.8 37.8l-4.1 4.1l71.8 71.7l41.8-41.8c9.3-9.4 9.3-24.5 0-33.9"
              ></path>
            </svg>
          </button>
        )}

        {!isCEO &&
          !isHeadOfDepartment &&
          node.children &&
          node.children.length > 0 && (
            <button
              className="closeShowBtn"
              onClick={() => toggleVisibility(nodeKey)}
            >
              {visibilityMap[nodeKey] ? (
                <MinusCircleOutlined />
              ) : (
                <PlusCircleOutlined />
              )}
            </button>
          )}
      </div>

      {isEmployee && (
        <>
          <EmployeeDetailModal
            form={form}
            visible={isModalVisible}
            onClose={() => setIsModalVisible(false)}
            employeeData={employeeData}
            onUpdate={handleUpdate}
          />

          <ChangeTeam
            visible={isChangeTeamVisible}
            onClose={handleCloseChangeTeam}
            onChangeTeam={handleChangeTeam}
            node={node}
          />
        </>
      )}

      {isHeadOfDepartment && (
        <Modal
          title={`${node.employee}'s ${node.position} Department`}
          open={isModalVisible}
          onCancel={handleCloseModal}
          onOk={handleCloseModal}
        >
          <ul>
            {node.children?.map((team, index) => (
              <Team key={index} team={team} />
            ))}
          </ul>
        </Modal>
      )}

      {(isHeadOfDepartment || isCEO || visibilityMap[nodeKey]) &&
        node.children && (
          <ul>
            {node.children.map((child, index) => (
              <Node
                key={`${nodeKey}-${index}`}
                node={child}
                visibilityMap={visibilityMap}
                toggleVisibility={toggleVisibility}
                path={nodeKey}
                onAddTeamMember={onAddTeamMember}
              />
            ))}
          </ul>
        )}
    </li>
  );
};

export default Node;
