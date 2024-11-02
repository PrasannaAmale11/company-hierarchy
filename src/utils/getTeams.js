const findTeamById = (data, identifier) => {
  // Check if the current node matches the identifier (by employee name or position)
  if (data.employee === identifier || data.position === identifier) {
    return data;
  }

  // If there are children, recursively search in each child
  if (data.children) {
    for (let child of data.children) {
      const result = findTeamById(child, identifier);
      if (result) {
        return result; // Return the found team member
      }
    }
  }

  return null; // Return null if not found in this branch
};

export default findTeamById

export const getEmployeeDetails = (modalData, employeeId) => {
  if (!modalData || !modalData.children) return null;

  let employeeDetails = null;

  const findEmployee = (children) => {
    for (const child of children) {
      if (child.employee === employeeId) {
        employeeDetails = child; // Store the employee details
        return; // Exit the loop
      }
      if (child.children) {
        findEmployee(child.children); // Recursively search in children
      }
    }
  };

  findEmployee(modalData.children);
  return employeeDetails;
};


export const getAllTeams = (node) => {
  const allTeamsList = [];
  // Recursive function to gather all teams
  const gatherTeams = (node) => {
    if (node.children) {
      node.children.forEach((child) => {
        if (child.position.startsWith("Team")) {
          allTeamsList.push(child);
        }
        gatherTeams(child); // Recurse into child nodes
      });
    }
  };
  gatherTeams(node);
  return allTeamsList;
};
export  const getAllDepartments = (node) => {
  const allDepartmentsList = [];
  // Recursive function to gather all departments
  const gatherDepartments = (node) => {
    if (node.children) {
      node.children.forEach((child) => {
        if (
          child.position === "Head of Staff/HR" ||
          child.position === "Head of Engineering" ||
          child.position === "Head of Design"
        ) {
          allDepartmentsList.push(child);
        }
        gatherDepartments(child); // Recurse into child nodes
      });
    }
  };
  gatherDepartments(node);
  return allDepartmentsList;
};

export const getTeamsAndDepartments = (data) => {
  const teams = [];
  const departments = [];

  const traverse = (node) => {
    // Push department info (Head of Staff, Head of Engineering, etc.)
    if (node.position.startsWith("Head of")) {
      departments.push({ id: node.id, position: node.position });
    }

    // If the current node has children (teams)
    if (node.children) {
      node.children.forEach((child) => {
        // Push team info (Team 1, Team 2, etc.)
        if (child.position.startsWith("Team")) {
          teams.push({ id: child.id, position: child.position });
        }
        // Recursively traverse the child nodes
        traverse(child);
      });
    }
  };

  traverse(data);
  return { teams, departments };
};

export const extractDepartmentsAndTeams = (data) => {
  const departments = [];
  const teams = [];

  const traverse = (node) => {
    if (node.children) {
      if (node.position.includes('Head')) {
        departments.push(node);
      }
      node.children.forEach(traverse);
    }
  };

  traverse(data);

  // Now extract teams from the departments
  departments.forEach(department => {
    if (department.children) {
      department.children.forEach(team => {
        teams.push(team);
      });
    }
  });

  return { departments, teams };
};

export const flattenHierarchy = (data) => {
  let result = [];

  const recurse = (node) => {
    const { id, employee, position, phone, email, children } = node;
    result.push({ id, employee, position, phone, email });
    if (children) {
      children.forEach(recurse);
    }
  };

  recurse(data);
  return result;
};



