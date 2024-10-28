// src/data/companyData.js
const hierarchyData = {
  position: 'CEO',
  employee: 'Alice Johnson',
  children: [
    {
      position: 'Head of Staff/HR',
      employee: 'Robert Smith',
      children: [
        {
          position: 'Team 1',
          children: [
            { position: 'Team Leader', employee: 'David Brown', phone: '123-456-7890', email: 'david@example.com' },
            { position: 'Team Member', employee: 'Sophia Williams', phone: '234-567-8901', email: 'sophia@example.com' },
          ],
        },
        {
          position: 'Team 2',
          children: [
            { position: 'Team Leader', employee: 'Michael Davis', phone: '345-678-9012', email: 'michael@example.com' },
            { position: 'Team Member', employee: 'Emma Taylor', phone: '456-789-0123', email: 'emma@example.com' },
          ],
        },
      ],
    },
    {
      position: 'Head of Engineering',
      employee: 'Thomas Moore',
      children: [
        {
          position: 'Team 1',
          children: [
            { position: 'Team Leader', employee: 'Christopher Anderson', phone: '567-890-1234', email: 'christopher@example.com' },
            { position: 'Team Member', employee: 'Olivia Martinez', phone: '678-901-2345', email: 'olivia@example.com' },
          ],
        },
      ],
    },
    {
      position: 'Head of Design',
      employee: 'Linda Martinez',
      children: [
        {
          position: 'Team 1',
          children: [
            { position: 'Team Leader', employee: 'Patricia Rodriguez', phone: '789-012-3456', email: 'patricia@example.com' },
            { position: 'Team Member', employee: 'Lucas Hernandez', phone: '890-123-4567', email: 'lucas@example.com' },
          ],
        },
        {
          position: 'Team 2',
          children: [
            { position: 'Team Leader', employee: 'Patricia Rodriguez', phone: '789-012-3456', email: 'patricia@example.com' },
            { position: 'Team Member', employee: 'Lucas Hernandez', phone: '890-123-4567', email: 'lucas@example.com' },
          ],
        },
      ],
    },
  ],
};

export default hierarchyData;
