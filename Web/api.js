import axios from 'axios';

const API_URL = 'http://localhost:3000'; // Base URL for your backend API


export const updateUserInfo = async (id, name, email, department) => {
    return await axios.post(`${API_URL}/update-info`, { id, name, email, department });
};
export const changePassword = async (email, oldPassword, newPassword) => {
    return await axios.post(`${API_URL}/change-password`, { email, oldPassword, newPassword });
};