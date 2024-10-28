import React from "react";
import "./styles/simple.css";
import {
  MinusCircleOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";


const Node = ({
  node,
  visibilityMap,
  toggleVisibility,
  openModal,
  path = "",
  onAddTeamMember,
}) => {
  const nodeKey = `${path}/${node.position}-${node.employee || ""}`;

  
  const isHeadOfDepartment =
    node.position === "Head of Staff/HR" ||
    node.position === "Head of Engineering" ||
    node.position === "Head of Design";

  const isTeam =
    node.position.startsWith("Team") &&
    !node.position.endsWith("Member") &&
    !node.position.endsWith("Leader");

  const isCEO = node.position === "CEO";

  return (
    <li key={nodeKey}>
      <div style={{ position: "relative" }}>
        <h2
          className="teamtitle"
          onClick={() => openModal(node)}
          style={{ cursor: "pointer" }}
        >
          {node.employee || ""}
        </h2>
        {isTeam ? (<p className="positionTitle">{node.position}</p>): (<p className="positionTitle">{node.position}</p>)}
        

        {isTeam && (<>
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
          </>
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

      {(isHeadOfDepartment || isCEO || visibilityMap[nodeKey]) &&
        node.children && (
          <ul>
            {node.children.map((child, index) => (
              <Node
                key={`${nodeKey}-${index}`}
                node={child}
                visibilityMap={visibilityMap}
                toggleVisibility={toggleVisibility}
                openModal={openModal}
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