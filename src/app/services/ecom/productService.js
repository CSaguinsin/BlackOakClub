import axios from "axios";

const backendBaseAPI = process.env.REACT_APP_API_BASE_URL;
const getAllProductsAPI = process.env.REACT_APP_PRODUCT_GET_ENDPOINT
const createProductsAPI = process.env.REACT_APP_PRODUCT_POST_ENDPOINT
const updateProductsAPI = process.env.REACT_APP_PRODUCT_PUT_ENDPOINT
const deleteProductsAPI = process.env.REACT_APP_PRODUCT_DELETE_ENDPOINT

const api = axios.create({
    baseURL: backendBaseAPI,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const productService = {
    getAllProducts: async () => {
        try {
            const response = await api.get(getAllProductsAPI);
            return response.data;
        } catch(error) {
            console.error('Error displaying all products:', error)
            throw error;
        }
    },

    createProducts: async () => {
        try {
            const response = await api.post(createProductsAPI);
            return response.data;
        } catch(error) {
            console.error('Error creating/adding new product/s', error);
            throw error
        }
    },

    updateProducts: async () => {
        try {
            const response = await api.put(updateProductsAPI);
            return response.data;
        } catch(error) {
            console.error('Error updating product', error);
            throw error;
        }
    },

    deleteProducts: async () => {
        try {
            const response = await api.delete(deleteProductsAPI);
            return response.data;
        } catch(error) {
            console.error('Error deleting product:', error);
            throw error;
        }
    }
};