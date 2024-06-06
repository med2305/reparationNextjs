import api from './index';

export const getUsers = async () => {
    try {
        const response = await api.get('/users');
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getUser = async (id) => {
    try {
        const response = await api.get(`/users/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const createUser = async (data) => {
    try {
        const response = await api.post('/users', data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const updateUser = async (id, data) => {
    try {
        const response = await api.patch(`/users/${id}`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const deleteUser = async (id) => {
    try {
        const response = await api.delete(`/users/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}