const products = require('../data/mockEcomDB')

const getAllProducts = (req, res) => {
    res.json(products);
};

const createProducts = (req, res) => {
    const { productName, productPrice } = req.body;
    const newProduct = {
        id: products.length + 1,
        productName,
        productPrice,
        createdAt: new Date(),
    };
    products.push(newProduct);
    res.status(201).json(newProduct);
};

const updateProducts = (req, res) => {
    const id = parseInt(req.params.id);
    const { product } = req.body;

    const index = products.findIndex(updateproduct => updateproduct.id === id);
    if (index !== -1) {
        products[index].product = product;
        return res.json(products[index]);
    }

    res.status(404).json({ error: 'Product not found'});
}


const deleteProducts = (req, res) => {
    const id = parseInt(req.params.id);
    const index = products.findIndex(updateproduct => updateproduct.id === id);
    if(index !== -1) {
        const deleted = products.splice(index, 1);
        return res.json({ message: 'Deleted Successfully', deleted});
    }

    res.status(404).json({ error: 'Product not found'});
}


module.exports = {
    getAllProducts,
    createProducts,
    updateProducts,
    deleteProducts
}