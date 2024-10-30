import { Form, Input, Modal, Button } from "antd";
import React from "react";

const AddMemberForm = ({ teamName, form, visible, onClose, onOk }) => {
  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        onOk(values);
        form.resetFields();
        onClose();
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  return (
    <Modal
      title={`Add Member to: ${teamName || "Team Not Found"}`}
      open={visible}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleOk}>
          OK
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical" style={{ width: "100%" }}>
        <Form.Item
          name="name"
          label="Name"
          rules={[
            {
              required: true,
              message: "Please input the name of the team member!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="id"
          label="ID"
          rules={[
            {
              required: true,
              message: "Please input the ID of the team member!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="phone"
          label="Phone Number"
          rules={[
            { required: true, message: "Please input the phone number!" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email ID"
          rules={[
            { required: true, message: "Please input the email address!" },
            { type: "email", message: "Please enter a valid email!" },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddMemberForm;
