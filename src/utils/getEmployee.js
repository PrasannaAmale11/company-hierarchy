
export const getAllEmployees = (modalData) => {
  if (!modalData || !modalData.children) return [];

  const members = [];
  const extractMembers = (children) => {
    children.forEach(child => {
      if (child.children) {
        extractMembers(child.children); 
      }
      if (child.position === 'Team Member') {
        members.push({ id: child.employee, name: child.employee }); 
      }
    });
  };

  extractMembers(modalData.children);
  return members;
};
