import api from './index';

export const getAvis = async () => {
    try {
        const response = await api.get('/avis');
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const createAvis = async (data) => {
    try {
        const response = await api.post('/avis', data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const approveAvis = async (id) => {
    try {
        const response = await api.patch(`/avis/approve/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const disapproveAvis = async (id) => {
    try {
        const response = await api.patch(`/avis/disapprove/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}