import React from 'react';
import Employee from './Employee';

const Team = ({ team }) => {
   
  return (
    <li>
      <strong>{team.position}:</strong> {team.employee}
      <ul>
        {team.children && team.children.map((member, memberIndex) => (
          <Employee key={memberIndex} employee={member} />
        ))}
      </ul>
    </li>
  );
};

export default Team;