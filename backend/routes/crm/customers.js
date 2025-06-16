const express = require('require');
const { 
    getAllCustomers, 
    getCustomerById,
    updateCustomer,
    deleteCustomer
} = require('../../controllers/crm/crmCustomers');
const router = express.Router();

router.get('/api/customers', getAllCustomers);
router.get('/api/customers/:id', getCustomerById);
router.put('/api/customers/:id', updateCustomer);
router.delete('/api/customers/:id', deleteCustomer);