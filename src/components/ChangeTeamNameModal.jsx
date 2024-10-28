import React, { useState } from 'react';
import { Modal, Input, Button } from "antd";

const ChangeTeamNameModal = ({ visible, onClose, currentTeamName, onSave }) => {
    const [teamName, setTeamName] = useState(currentTeamName);

    const handleSave = () => {
        onSave(teamName);  
        onClose();
    };

    return (
        <Modal
            title="Change Team Name"
            open={visible}
            onCancel={onClose}
            footer={[
                <Button key="cancel" onClick={onClose}>Cancel</Button>,
                <Button key="save" type="primary" onClick={handleSave}>Save</Button>,
            ]}
        >
            <Input
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                placeholder="Enter new team name"
            />
        </Modal>
    );
};

export default ChangeTeamNameModal;
