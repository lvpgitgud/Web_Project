import React, { useState } from 'react';
import { changePassword } from './api'; // Import the changePassword function

function ChangePasswordForm() {
    const [email, setEmail] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [repeatNewPassword, setRepeatNewPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (newPassword !== repeatNewPassword) {
            setMessage('New password and repeat new password do not match.');
            return;
        }

        try {
            const result = await changePassword(email, oldPassword, newPassword);
            setMessage(result);
        } catch (error) {
            setMessage(error);
        }
    };

    return (
        <div>
            <h2>Change Password</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <label>Old Password:</label>
                    <input type="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
                </div>
                <div>
                    <label>New Password:</label>
                    <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                </div>
                <div>
                    <label>Repeat New Password:</label>
                    <input type="password" value={repeatNewPassword} onChange={(e) => setRepeatNewPassword(e.target.value)} />
                </div>
                <button type="submit">Change Password</button>
            </form>
            {message && <div>{message}</div>}
        </div>
    );
}

export default ChangePasswordForm;
