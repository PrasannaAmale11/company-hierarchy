// src/data/companyData.js
const hierarchyData = {
  id: "1",
  position: "CEO",
  employee: "Alice Johnson",
  phone: "123-000-0000",
  email: "alice@example.com",
  children: [
    {
      id: "2",
      position: "Head of Staff/HR",
      employee: "Robert Smith",
      phone: "234-000-0000",
      email: "robert@example.com",
      children: [
        {
          id: "3",
          position: "Team 1",
          children: [
            {
              id: "4",
              position: "Team Leader",
              employee: "David Brown",
              phone: "123-456-7890",
              email: "david@example.com",
            },
            {
              id: "5",
              position: "Team Member",
              employee: "Sophia Williams",
              phone: "234-567-8901",
              email: "sophia@example.com",
            },
          ],
        },
        {
          id: "6",
          position: "Team 2",
          children: [
            {
              id: "7",
              position: "Team Leader",
              employee: "Michael Davis",
              phone: "345-678-9012",
              email: "michael@example.com",
            },
            {
              id: "8",
              position: "Team Member",
              employee: "Emma Taylor",
              phone: "456-789-0123",
              email: "emma@example.com",
            },
          ],
        },
      ],
    },
    {
      id: "9",
      position: "Head of Engineering",
      employee: "Thomas Moore",
      phone: "234-567-8900",
      email: "thomas@example.com",
      children: [
        {
          id: "10",
          position: "Team 1",
          children: [
            {
              id: "11",
              position: "Team Leader",
              employee: "Christopher Anderson",
              phone: "567-890-1234",
              email: "christopher@example.com",
            },
            {
              id: "12",
              position: "Team Member",
              employee: "Olivia Martinez",
              phone: "678-901-2345",
              email: "olivia@example.com",
            },
          ],
        },
      ],
    },
    {
      id: "13",
      position: "Head of Design",
      employee: "Linda Martinez",
      phone: "345-678-9011",
      email: "linda@example.com",
      children: [
        {
          id: "14",
          position: "Team 1",
          children: [
            {
              id: "15",
              position: "Team Leader",
              employee: "Patricia Rodriguez",
              phone: "789-012-3456",
              email: "patricia@example.com",
            },
            {
              id: "16",
              position: "Team Member",
              employee: "Lucas Hernandez",
              phone: "890-123-4567",
              email: "lucas@example.com",
            },
          ],
        },
        {
          id: "17",
          position: "Team 2",
          children: [
            {
              id: "18",
              position: "Team Leader",
              employee: "Patricia Rodriguez",
              phone: "789-012-3456",
              email: "patricia@example.com",
            },
            {
              id: "19",
              position: "Team Member",
              employee: "Lucas Hernandez",
              phone: "890-123-4567",
              email: "lucas@example.com",
            },
          ],
        },
      ],
    },
  ],
};

export default hierarchyData;
