import api from './index';

export const createDemande = async (data) => {
    try {
        const response = await api.post('/demande', data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getDemandes = async (technicianId, deliveryId, status) => {
    try {
        const response = await api.get('/demande', {
            params: {
                technicianId,
                deliveryId,
                status
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deleteDemande = async (id) => {
    try {
        const response = await api.delete(`/demande/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const updateDemande = async (id, data) => {
    try {
        const response = await api.patch(`/demande/${id}`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
}