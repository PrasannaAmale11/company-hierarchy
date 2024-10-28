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
 
  