const express = require('express');
const {
    getAllOrders,
    addNewOrders,
    updateOrders,
    deleteOrders
} = require('../../controllers/ecom/ecomOrders');

const router = express.Router();

router.get('/api/orders', getAllOrders);
router.post('/api/orders', addNewOrders);
router.put('/api/orders/:id', updateOrders);
router.delete('/api/orders/:id', deleteOrders);

module.exports = router;
