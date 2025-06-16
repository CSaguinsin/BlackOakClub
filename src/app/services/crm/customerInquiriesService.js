import axios from "axios";

const backendBaseAPI = process.env.REACT_APP_API_BASE_URL;
const displayAllInquiriesAPI = process.env.REACT_APP_INQUIRIES_GET_ENDPOINT;
const deleteInquiriesAPI = process.env.REACT_APP_INQUIRIES_DELETE_ENDPOINT;

const api = axios.create({
    baseURL: backendBaseAPI,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const customerInquiriesService = {
    displayAllInquiriesAPI: async () => {
        try {
            const response = await api.get(displayAllInquiriesAPI);
            return response.data;
        } catch(error) {
            console.error('Error displaying all customer inquiries', error);
            throw error
        }
    },

    deleteInquiries: async () => {
        try {
            const response = await api.delete(deleteInquiriesAPI);
            return response.data;
        } catch(error) {
            console.error('Error deleting customer inquiries', error);
            throw error;
        }
    }
};