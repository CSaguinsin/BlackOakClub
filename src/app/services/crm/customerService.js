import axios from "axios";

const backendBaseAPI = process.env.REACT_APP_API_BASE_URL;
const getAllCustomersAPI = process.env.REACT_APP_CRM_GET_ENDPOINT
const getCustomerByIdAPI = process.env.REACT_APP_CRM_GET_BYID_ENDPOINT
const updateCustomer = process.env.REACT_APP_CRM_PUT_ENDPOINT
const deleteCustomer = process.env.REACT_APP_CRM_DELETE_ENDPOIN

const api = axios.create({
    baseURL: backendBaseAPI,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const customerService = {
    getAllCustomers: async () => {
        try {
            const response = await api.get(getAllCustomersAPI);
            return response.data;
        } catch (error) {
            console.error('Error displaying all customers:', error);
            throw error
        }
    },

    getCustomerById: async () => {
        try {
            const response = await api.get(getCustomerByIdAPI);
            return response.data;
        } catch (error) {
            console.error('Error displaying customer by ID:', error);
            throw error;
        }
    },

    updateCustomer: async () => {
        try {
            const response = await api.put(updateCustomer);
            return response.data;
        } catch (error) {
            console.error('Error updating customer', error);
            throw error;
        }
    },

    deleteCustomer: async () => {
        try {
            const response = await api.detele(deleteCustomer);
            return response.data;
        } catch (error) {
            console.error('Error deleting customer:', error);
            throw error;
        }
    }
};