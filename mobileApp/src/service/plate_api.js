import axios from 'axios';
const BASE_URL = 'http://192.168.0.109:8000';

export const countPlatesApi = async (token) => {
    try {
        const result = await axios.get(`${BASE_URL}/api/plate/count`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return result;
    } catch (error) {
        return error.response.data;
    }
};

export const listPlatesApi = async (token) => {
    try {
        const result = await axios.get(`${BASE_URL}/api/plate/list`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return result;
    } catch (error) {
        return error.response.data;
    }
};

export const addPlatesApi = async (data, token) => {
    try {
        const result = await axios.post(`${BASE_URL}/api/plate/add`,
            data,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        return result;
    } catch (error) {
        return error.response.data;
    }
};

export const searchPlatesApi = async (data, token) => {
    try {
        const result = await axios.put(`${BASE_URL}/api/plate/search`,
            data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return result;
    } catch (error) {
        return error.response.data;
    }
};

export const editPlatesApi = async (data, id, token) => {
    try {
        const result = await axios.put(`${BASE_URL}/api/plate/edit/${id}`,
            data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return result;
    } catch (error) {
        return error.response.data;
    }
};

export const deletePlatesApi = async (id, token) => {
    try {
        const result = await axios.delete(`${BASE_URL}/api/plate/delete/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return result;
    } catch (error) {
        return error.response.data;
    }
};
