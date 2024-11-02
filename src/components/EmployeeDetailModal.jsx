import { Form, Input, Modal } from "antd";
import React from "react";

const EmployeeDetailModal = ({ visible, onClose, employeeData, onUpdate,form }) => {
  

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        onUpdate({ ...employeeData, ...values });
      })
      .catch((info) => {
        console.log("Validation Failed:", info);
      });
  };

  return (
    <Modal
      title="Employee Details"
      open={visible}
      onOk={handleOk}
      onCancel={onClose}
    >
      <Form form={form} layout="vertical" initialValues={employeeData}>
        <Form.Item
          name="employee"
          label="Employee Name"
          rules={[{ required: true, message: "Please input employee name!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="position"
          label="Position"
          rules={[{ required: true, message: "Please input position!" }]}
        >
          <Input disabled />
        </Form.Item>
        <Form.Item
          name="phone"
          label="Phone"
          rules={[{ required: true, message: "Please input phone!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true, message: "Please input email!" }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EmployeeDetailModal;