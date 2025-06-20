const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// const getAllProducts = (req, res) => {
//     res.json(products);
// };

const getAllProducts = async (req, res) => {
    const products = await prisma.products.findMany();
    res.json(products);
};

const createProducts = async (req, res) => {
    const {
        productName,
        productDescription,
        productPrice,
    } = req.body;

    try {
        const newProduct = await prisma.products.create({
            data: {
                productName: productName ? parseInt(productName) : null,
                productDescription: productDescription ? parseInt(productDescription): null,
                productPrice: productPrice ? parseInt(productPrice) : null
            }
        });
        
        res.status(201).json(newProduct);
    } catch (error) {
        console.error('Error creating new Product:', error);
        res.status(500).json({ error: 'Failed to create new product'});
    };
};


const updateProducts = async (req, res) => {
    const productId = parseInt(req.params.productId);
    const {
        productName,
        productDescription,
        productPrice,
    } = req.body;

    try {
        const updateProduct = await prisma.products.update({
            where: { productId },
            data: {
                ...(productName !== undefined && {productName: parseInt(productName) }),
                ...(productDescription !== undefined && {productDescription: parseInt(productDescription) }),
                ...(productPrice !== undefined && {productPrice: parseInt(productPrice) })
            }
        });

        res.json(updateProduct);
    } catch (error) {
        console.error('Error updating products:', error);
        res.status(500).json({ error: 'Failed to update product'});
    };
}


const deleteProducts = async (req, res) => {
    try {
        const deleted = await prisma.products.delete({ where: { productId: parseInt(req.params.productId)}})
    } catch(error) {
        res.status(404).json({ error: 'Product not found'});
    }
}


module.exports = {
    getAllProducts,
    createProducts,
    updateProducts,
    deleteProducts
}