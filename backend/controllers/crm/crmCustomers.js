const customers = require('../../data/mockEcomDB');

const getAllCustomers = (req, res) => {
    res.json(customers)
};

const getCustomerById = (req, res) => {
    const id = req.params.id;
    res.send(`User ID: ${id}`);
};

const updateCustomer = (req, res) => {
    const id = parseInt(req.params.id);
    const {
        customerEmail,
        customerFullName,
        customerAddress,
        customerPhoneNumber,
        customerCity,
        customerPostalCode
    } = req.body;

    const index = customers.findIndex(customer => customer.id === id);
    if (index !== -1) {
        if (customerEmail !== undefined) customers[index].customerEmail = customerEmail;
        if (customerFullName !== undefined) customers[index].customerFullName = customerFullName;
        if (customerAddress !== undefined) customers[index].customerAddress = customerAddress;
        if (customerPhoneNumber !== undefined) customers[index].customerPhoneNumber = customerPhoneNumber;
        if (customerCity !== undefined) customers[index].customerCity = customerCity;
        if (customerPostalCode !== undefined) customers[index].customerPostalCode = customerPostalCode;
    
        return res.json(customers[index]);
    }

    res.status(404).json({ error: 'Customer not found'});
};

const deleteCustomer = (req, res) => {
    const id = parseInt(req.params.id);
    const index = customers.findIndex(updatecustomer => updatecustomer.id === id);
    if(index !== -1) {
        const deleted = customers.splice(index, 1);
        return res.json({ message: 'Customer deleted successfully', deleted})
    }
    res.status(404).json({error: 'Customer not found'});
}


module.exports = {
    getAllCustomers,
    getCustomerById,
    updateCustomer,
    deleteCustomer
}