import React, { useEffect, useState } from 'react';
import { Modal, Form, Select, Button } from 'antd';
import { getTeamsAndDepartments } from '../utils/getTeams'; // Import the combined function

const ChangeTeam = ({ visible, onClose, onChangeTeam, node }) => {
  const [departments, setDepartments] = useState([]);
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    // Get all teams and departments from the node
    const { teams, departments } = getTeamsAndDepartments(node);
    setTeams(teams);
    setDepartments(departments);
  }, [node]);

  const [form] = Form.useForm();

  const handleFinish = (values) => {
    const selectedTeam = values.team; // Get the selected team
    const selectedDepartment = values.department; // Get the selected department

    // Combine selected department and team for onChangeTeam function if needed
    onChangeTeam({ team: selectedTeam, department: selectedDepartment });

    form.resetFields(); // Reset the form fields after submission
    onClose(); // Close the modal
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
          <Select placeholder="Choose a department">
            {departments.length > 0 ? (
              departments.map(department => (
                <Select.Option key={department.id} value={department.position}>
                  {department.position}
                </Select.Option>
              ))
            ) : (
              <Select.Option disabled>No departments available</Select.Option>
            )}
          </Select>
        </Form.Item>

        <Form.Item
          name="team"
          label="Select Team"
          rules={[{ required: true, message: 'Please select a team!' }]}
        >
          <Select placeholder="Choose a team">
            {teams.length > 0 ? (
              teams.map(team => (
                <Select.Option key={team.id} value={team.position}>
                  {team.position}
                </Select.Option>
              ))
            ) : (
              <Select.Option disabled>No teams available</Select.Option>
            )}
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

// getTeamsAndDepartments function remains unchanged
