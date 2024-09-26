import axios from 'axios';

const API_URL = 'http://localhost:8888';

export const loginUser = async (username1, password1) => {
    const formData = new FormData();
    formData.append('username',username1);
    formData.append('password',password1);
    
    const response = await axios.post(`${API_URL}/login`, formData,{
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }});
        console.log(response.data)
    return response.data;
};

export const registerUser = async (data) => {
    const params={
        username: data.username,
        password: data.password,
        role: data.role
    }
    const response = await axios.post(`${API_URL}/registerUser`, null, {params});
    return response.data;
};
