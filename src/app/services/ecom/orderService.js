import axios from "axios";

const backendBaseAPI = process.env.REACT_APP_API_BASE_URL;
const getAllOrdersAPI = process.env.REACT_APP_ORDERS_GET_ENDPOINT;
const addNewOrdersAPI = process.env.REACT_APP_ORDERS_GET_ENDPOINT;
const updateOrdersAPI = process.env.REACT_APP_ORDERS_PUT_ENDPOINT;
const deleteOrdersAPI = process.env.REACT_APP_ORDERS_DELETE_ENDPOINT;

const api = axios.create({
    baseURL: backendBaseAPI,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const orderService = {
    getAllOrders: async () => {
        try {
            const response = await api.get(getAllOrdersAPI); 
            return response.data;
        } catch (error) {
            console.error('Error fetching orders:', error);
            throw error; 
        }
    },

    addNewOrders: async () => {
        try{
            const response = await api.post(addNewOrdersAPI);
            return response.data;
        } catch(error) {
            console.error('Error adding new Orders:', error);
            throw error;
        };
    },

    updateOrders: async () => {
        try {
            const response = await api.put(updateOrdersAPI);
            return response.data;
        } catch(error) {
            console.error('Error updating order:', error);
            throw error;
        };
    },

    deleteOrders: async () => {
        try {
            const response = await api.delete(deleteOrdersAPI);
            return response.data;
        } catch(error) {
            console.error('Error deleting order:', error);
            throw error;
        }
    }
};