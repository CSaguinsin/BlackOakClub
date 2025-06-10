const express = require('express');
const {
    getAllProducts,
    createProducts,
    updateProducts,
    deleteProducts
} = require('../../controllers/ecom/ecomProducts')

const router = express.Router();

router.get('/api/products', getAllProducts);
router.post('/api/products', createProducts);
router.put('/api/products/:productId', updateProducts);
router.delete('/api/products/:productId', deleteProducts)

module.exports = router;