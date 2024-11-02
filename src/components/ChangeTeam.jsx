import React, { useEffect, useState } from 'react';
import { Modal, Form, Select, Button } from 'antd';
import hierarchyData from '../data/companyData';

const ChangeTeam = ({ visible, onClose, onChangeTeam, employeeDataId }) => {
  // Helper functions to parse departments and teams from hierarchyData
  const extractDepartments = (data) => {
    return data.children.map((department) => ({
      id: department.id,
      position: department.position,
    }));
  };

  const extractTeamsByDepartment = (data, departmentName) => {
    const department = data.children.find((dept) => dept.position === departmentName);
    return department 
      ? department.children.map((team) => ({
          id: team.id,
          position: team.position,
        }))
      : [];
  };

  const [form] = Form.useForm();
  const [departments] = useState(extractDepartments(hierarchyData)); // Extract departments once
  const [filteredTeams, setFilteredTeams] = useState([]);
  const handleFinish = (values) => {
    const selectedTeamId = values.team; // Capture the selected team ID
    const selectedDepartment = values.department;

    // Ensure employeeDataId is defined and pass the necessary data
    console.log('Employee Data ID:', employeeDataId); // Log the employee data ID

    if (employeeDataId && employeeDataId.id) { // Check if id exists
        onChangeTeam({
            employeeId: employeeDataId.id, // Correctly pass the employee ID
            newTeamId: selectedTeamId, // Use selected team ID
            department: selectedDepartment,
        });
    } else {
        console.error('No valid employee ID to change team.');
    }

    form.resetFields();
    onClose();
};



  const handleDepartmentChange = (department) => {
    // Extract teams for the selected department
    const teamsInDepartment = extractTeamsByDepartment(hierarchyData, department);
    console.log("Filtered Teams:", teamsInDepartment); // Log teams to verify
    setFilteredTeams(teamsInDepartment);
    form.setFieldsValue({ team: undefined }); // Reset team selection on department change
  };

  return (
    <Modal
      title="Change Team/Department"
      open={visible}
      onCancel={onClose}
      footer={null}
    >
      <Form form={form} onFinish={handleFinish}>
        <Form.Item
          name="department"
          label="Select Department"
          rules={[{ required: true, message: 'Please select a department!' }]}
        >
          <Select 
            placeholder="Choose a department" 
            onChange={handleDepartmentChange} // Set up department change handler
          >
            {departments.map((department) => (
              <Select.Option key={department.id} value={department.position}>
                {department.position}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="team"
          label="Select Team"
          rules={[{ required: true, message: 'Please select a team!' }]}
        >
          <Select placeholder="Choose a team" disabled={filteredTeams.length === 0}>
            {filteredTeams.map((team) => (
              <Select.Option key={team.id} value={team.id}> {/* Ensure this is the team ID */}
                {team.position}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Change Team
          </Button>
          <Button style={{ marginLeft: '10px' }} onClick={onClose}>
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ChangeTeam;
