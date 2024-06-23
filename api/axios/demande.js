import api from './index';

export const createDemande = async (data) => {
    try {
        const response = await api.post('/demande', data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getDemandes = async (status, technicianId, deliveryId, clientId) => {
    try {
        const response = await api.get('/demande', {
            params: {
                status: Array.isArray(status) ? status.join(',') : status,
                technicianId,
                deliveryId,
                clientId
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

export const getDemande = async (data) => {
    try {
        const response = await api.get(`/demande/${data.id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const addCommentToDemande = async (id, userId, msg) => {
    try {
        const response = await api.post(`/demande/${id}`, {userId, msg});
        return response.data;
    } catch (error) {
        throw error;
    }
}