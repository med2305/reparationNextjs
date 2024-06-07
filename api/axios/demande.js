import api from './index';

export const createDemande = async (data) => {
    try {
        const response = await api.post('/demande', data);
        return response.data;
    } catch (error) {
        throw error;
    }
}