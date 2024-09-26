import axios from 'axios';

const API_URL = 'http://localhost:8888';

export const loginUser = async (username1, password1) => {
    const params = {
        username:username1,
        password:password1
    };
    
    const response = await axios.post(`${API_URL}/loginUser?username=${username1}&password=${password1}`);
      if(response.data==null){
        return (
            <div>
                No user found
            </div>
        )
      }
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
