# BlackOak Club
A full stack e-commerce web app built using the following technologies. This project aim to developed a webstore and internal CRM tool for BlackOak.

- reactjs, <br>
- nodejs/expressjs,  <br>
- mysql,  <br>
- Railway
- postman
- git
## Backend architecture
Created using ExpressJs, followed the industry standard of creating ```Routes```, and ```Controllers``` on seperate file and the ```server.js``` as the entry point of the expressJs app.
<br> 
First is the E-commerce expressjs endpoint. named the folders ```ecom``` on the controllers, and ```ecommerce``` on the routes. This have two endpoints, ```Orders``` and ```Products```
### Orders controller (ecomOrders.js)
```javascript
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


```
On the ```addNewOrders``` function it represents all the columns needed to be filled from the frontend into the database table
We have the following columns
```
productName,
customerEmail, 
customerFullName, 
customerAddress, 
customerPhoneNumber, 
customerCity, 
customerPostalCode 
```
And on the ```deleteOrders``` function all that is needed is the order id. **PLEASE DONT FORGET TO EXPORT ALL OF THE FUNCTION BEFORE IMPORTING ON THE DESIGNATED ROUTE FILE**
### Orders route (orders.js)
``` javascript
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

```
And then call the route ```orders.js``` in ```server.js``` 
```javascript
const express = require('express');
const app = express();
// ecommerce routes
const ecomOrderRoutes = require('./routes/ecommerce/orders');
const ecomProductRoutes = require('./routes/ecommerce/products');
app.use(express.json());
app.use(ecomOrderRoutes);
app.use(ecomProductRoutes);

// crm routes
const crmInquiriesRoute = require('./routes/crm/inquiries');
app.use(express.json());
app.use(crmInquiriesRoute);



const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

```
**Orders endpoint working correctly, tested using ```Postman``` To test on postman run the backend server with this command ```node server.js```, and do the following:**
<br>
### For the ```GET``` HTTP request do  the following:
Put the HTTP request on ```GET```  and then put the ```router.get('/api/orders', getAllOrders);``` as ```http://localhost:3000/api/orders```
### For the ```POST``` HTTP request do  the following:
Put the HTTP request on ```POST```  and then put the ```router.post('/api/orders', addNewOrders);``` as ```http://localhost:3000/api/orders``` and choose the ```Body``` and populate it with this format
```javascript
{
    "productName": "Black Oak Manila Varsity Old",
    "customerEmail": "saguinsintestmail@gmail.com", 
    "customerFullName": "Carl Saginsin", 
    "customerAddress": "Barangay 3, San Sebastian Street Quiapo, Manila", 
    "customerPhoneNumber": "099908998999", 
    "customerCity":"Manila", 
    "customerPostalCode": "1400" 
}
```
And it will display like this, This means data is Successfully stored on the database table
| id  | productName | customerEmail | customerFullName | customerAddress | customerPhoneNumber | customerCity | customerPostalCode
| -------------     | ------------- | ------------- | ------------- | ------------- | ------------- | ------------- | ------------- |
| 1   | Black Oak Manila Varsity Old | saguinsintestmail@gmail.com | Carl Saginsin | Barangay 3, San Sebastian Street Quiapo, Manila | 099908998999 | Manila | 1400

### For the ```PUT``` HTTP request do  the following:
Put the HTTP request on ```PUT```  and then put the ```router.put('/api/orders/:id', updateOrders);``` as ```http://localhost:3000/api/orders/:id```
### For the ```DELETE``` HTTP request do  the following:
Put the HTTP request on ```DELETE```  and then put the ```router.post('/api/orders', addNewOrders);``` as ```http://localhost:3000/api/orders:id``` the ```id``` will be the indicator which data on the table will be deleted
### The following endpoint testing will be the same as the ```Orders``` just do the same on the other using ```Postman```