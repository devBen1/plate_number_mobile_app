import axios from 'axios';
const BASE_URL = process.env.REACT_APP_IP_ADDRESS || 'http://192.168.0.109:8000';

export const updateAccountApi = async (data, token) => {
    try {
        const result = await axios.put(`${BASE_URL}/api/auth/update/account`,
            data,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return result;
    } catch (error) {
        return error.response.data;
    }
};

export const listUsersApi = async (token) => {
    try {
        const result = await axios.get(`${BASE_URL}/api/user/list`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return result;
    } catch (error) {
        return error.response.data;
    }
};

export const addUsersApi = async (data, token) => {
    try {
        const result = await axios.post(`${BASE_URL}/api/user/add`,
            data,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return result;
    } catch (error) {
        return error.response.data;
    }
};

export const editUsersApi = async (data, id, token) => {
    try {
        const result = await axios.put(`${BASE_URL}/api/user/edit/${id}`,
            data,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return result;
    } catch (error) {
        return error.response.data;
    }
};

export const deleteUsersApi = async (id, token) => {
    try {
        const result = await axios.delete(`${BASE_URL}/api/user/delete/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return result;
    } catch (error) {
        return error.response.data;
    }
};
