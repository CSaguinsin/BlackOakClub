const products = require('../../data/mockEcomDB')

const getAllProducts = (req, res) => {
    res.json(products);
};

const createProducts = (req, res) => {
    const { productName, productPrice, productDescription } = req.body;
    const newProduct = {
        productId: products.length + 1,
        productName,
        productPrice,
        productDescription,
        createdAt: new Date(),
    };
    products.push(newProduct);
    res.status(201).json(newProduct);
};

const updateProducts = (req, res) => {
    const id = parseInt(req.params.id);
    const {
        productId,
        productName,
        productDescription,
        productPrice,
        productCategory,
        productStock
    } = req.body;

    const index = products.findIndex(product => product.id === id);
    if (index !== -1) {
        // Update only provided fields
        if (productId !== undefined) products[index].productId = productId;
        if (productName !== undefined) products[index].productName = productName;
        if (productDescription !== undefined) products[index].productDescription = productDescription;
        if (productPrice !== undefined) products[index].productPrice = productPrice;
        if (productCategory !== undefined) products[index].productCategory = productCategory;
        if (productStock !== undefined) products[index].productStock = productStock;

        return res.json(products[index]);
    }

    res.status(404).json({ error: 'Product not found' });
};


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