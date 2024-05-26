// formHandler.js
import { changePassword } from './api.js';

async function submitForm() {
    const email = document.getElementById('email').value;
    const oldPassword = document.getElementById('old-password').value;
    const newPassword = document.getElementById('new-password').value;
    const repeatNewPassword = document.getElementById('repeat-new-password').value;
    
    if (!email || !oldPassword || !newPassword || !repeatNewPassword) {
        alert("All fields are required.");
        return;
    }
    
    if (newPassword !== repeatNewPassword) {
        alert("New passwords do not match.");
        return;
    }
    
    try {
        const response = await changePassword(email, oldPassword, newPassword);
        if (response.data.success) {
            alert('Password changed successfully.');
        } else {
            alert('Error: ' + response.data.message);
        }
    } catch (error) {
        alert('Error: ' + error.message);
    }
}

window.submitForm = submitForm; // Make the function available in the global scope
