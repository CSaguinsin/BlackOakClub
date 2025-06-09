const orders = require('../../data/mockEcomDB')

const getAllOrders = (req, res) => {
    res.json(orders);
}

const addNewOrders = (req, res) => {
    const { 
        productName,
        customerEmail, 
        customerFullName, 
        customerAddress, 
        customerPhoneNumber, 
        customerCity, 
        customerPostalCode  
    } = req.body;

    const newOrder = {
        id: orders.length + 1,
        productName,
        customerEmail,
        customerFullName,
        customerAddress,
        customerPhoneNumber,
        customerCity,
        customerPostalCode      
    };
    orders.push(newOrder);
    res.status(201).json(newOrder);
};

const updateOrders = (req, res) => {
    const id = parseInt(req.params.id);
    const {
        productName,
        customerEmail,
        customerFullName,
        customerAddress,
        customerPhoneNumber,
        customerCity,
        customerPostalCode
    } = req.body;

    const index = orders.findIndex(order => order.id === id);
    if (index !== -1) {
        // Update only provided fields
        if (productName !== undefined) orders[index].productName = productName;
        if (customerEmail !== undefined) orders[index].customerEmail = customerEmail;
        if (customerFullName !== undefined) orders[index].customerFullName = customerFullName;
        if (customerAddress !== undefined) orders[index].customerAddress = customerAddress;
        if (customerPhoneNumber !== undefined) orders[index].customerPhoneNumber = customerPhoneNumber;
        if (customerCity !== undefined) orders[index].customerCity = customerCity;
        if (customerPostalCode !== undefined) orders[index].customerPostalCode = customerPostalCode;

        return res.json(orders[index]);
    }

    res.status(404).json({ error: 'Order not found' });
};


const deleteOrders = (req, res) => {
    const id = parseInt(req.params.id);
    const index = orders.findIndex(updateorder => updateorder.id === id);
    if(index !== -1) {
        const deleted = orders.splice(index, 1);
        return res.json({ message: 'Order Deleted Successfully', deleted});
    }

    res.status(404).json({ error: 'Order not found'});
};

module.exports = {
    getAllOrders,
    addNewOrders,
    updateOrders,
    deleteOrders
}

