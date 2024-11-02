import React from "react";

const Employee = ({ employee }) => {
  return (
    <li style={{ listStyleType: "circle", marginLeft: "1.5rem" }}>
      {employee.employee}
    </li>
  );
};

export default Employee;