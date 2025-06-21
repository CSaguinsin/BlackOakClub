# BlackOak Club
A full stack e-commerce web app built using the following technologies. This project aim to developed a webstore and internal CRM tool for BlackOak.

- reactjs, <br>
- nodejs/expressjs,  <br>
- prisma ORM
- mysql,  <br>
- Railway
- postman
- git


## Frontend architecture
Created using ReactJs, TailwindCSS, and Axios for backend communication with the ExpressJs app

```javascript
src/app
│── auth/                       # authentication folder
│── components/                 # Components folder
│── services/
│   └── admin                  # API communication layer for ADMIN
|   └── crm                    # API communication layer for CRM
|       └── customerInquiriesService.js    # Communication endpoint for customer inquiries on crm module
|       └── customerService.js             # Communication endpoint for customers on crm module  
|   └── ecom                   # API communication layer for E-Commerce
|       └── orderService.js    # Communication endpoint for orders on ecom module
|       └── productService.js  # Communication endpoint for products on ecom module  
│── page.js                    # Main application component with routing
└── layout.js                   # React application entry point
```
## Backend architecture
Created using Node/ExpressJs, and Prisma ORM followed the industry standard of creating ```Routes```, and ```Controllers``` on seperate file and the ```server.js``` as the entry point of the expressJs app.
<br> 
First is the E-commerce expressjs endpoint. named the folders ```ecom``` on the controllers, and ```ecommerce``` on the routes. This have two endpoints, ```Orders``` and ```Products```

### Prisma ORM implemented controller (ecomOrders.js)
```javascript
const { PrismaClient } = require('../../generated/prisma')
const prisma = new PrismaClient();

const getAllOrders = async (req, res) => {
    const orders = await prisma.orders.findMany();
    res.json(orders);
};

const addNewOrders = async (req, res) => {
  const {
    customerId,
    productId,
    orderDate,
    orderStatus
  } = req.body;

  try {
    const newOrder = await prisma.orders.create({
      data: {
        customerId: customerId ? parseInt(customerId) : null,
        productId: productId ? parseInt(productId) : null,
        orderDate: orderDate ? new Date(orderDate) : null,
        orderStatus
      }
    });

    res.status(201).json(newOrder);
  } catch (error) {
    console.error('Error creating new order:', error);
    res.status(500).json({ error: 'Failed to create order' });
  }
};


const updateOrders = async (req, res) => {
  const orderId = parseInt(req.params.ordersId);
  const {
    customerId,
    productId,
    orderDate,
    orderStatus
  } = req.body;

  try {
    const updatedOrder = await prisma.orders.update({
      where: { orderId },
      data: {
        ...(customerId !== undefined && { customerId: parseInt(customerId) }),
        ...(productId !== undefined && { productId: parseInt(productId) }),
        ...(orderDate !== undefined && { orderDate: new Date(orderDate) }),
        ...(orderStatus !== undefined && { orderStatus })
      }
    });

    res.json(updatedOrder);
  } catch (error) {
    console.error('Error updating order:', error);
    if (error.code === 'P2025') {
      // Prisma couldn't find the record to update
      return res.status(404).json({ error: 'Order not found' });
    }
    res.status(500).json({ error: 'Failed to update order' });
  }
};


const deleteOrders = async (req, res) => {
  try {
    const deleted = await prisma.orders.delete({ where: { orderId: parseInt(req.params.id) } });
    res.json({ message: 'Order deleted successfully', deleted });
  } catch {
    res.status(404).json({ error: 'Customer not found' });
  }
};

module.exports = {
    getAllOrders,
    addNewOrders,
    updateOrders,
    deleteOrders
}
```
After Implementing prisma ORM we are not using ```mockDB.js``` anymore, Instead we are now using ```MySQL``` set it up on ```.env``` and used Prisma for the communication of the ```ExpressJs```.
Here is an example of .env db and Prisma config
```javascript
HOST=localhost
PORT= (Port of your expressJs backend)
DATABASE= (Database name of the project database)
USER= (username of MySQL user)
PASSWORD= (password of MySQL user)
DATABASE_URL= "mysql://USER:PASSWORD@HOST:PORT/DATABASE" (Here is an example of the structure of the base URL and the path using placeholder values in uppercase letters:)
```
## Database schema design
[![Database Design](public/dbDesign.png)](public/dbDesign.png)
After creating the database on MySQL
Read more about connecting your database into your backend using prisma via [Prisma Documentation](https://www.prisma.io/docs/orm/overview/databases/mysql).<br>
Now after creating the tables on ```MySQL``` We are gonna pull our tables using ```npx prisma db pull``` So that we can see our table structures more clearly on ```schema.prisma``` file.
```javascript
generator client {
  provider = "prisma-client-js"
  output   = "../generated/prisma"
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

model customers {
  customerId          Int        @id @default(autoincrement()) @db.UnsignedInt
  customerEmail       String?    @db.VarChar(50)
  customerFullName    String?    @db.VarChar(100)
  customerAddress     String?    @db.VarChar(100)
  customerPhoneNumber BigInt?
  customerCity        String?    @db.VarChar(100)
  customerPostalCode  Int?
  inquiries           inquiries?
  orders              orders[]
}

model inquiries {
  inquiryId          Int        @id @default(autoincrement()) @db.UnsignedInt
  customerId         Int?       @unique(map: "customerId") @db.UnsignedInt
  inquiryTitle       String?    @db.VarChar(50)
  inquiryDescription String?    @db.VarChar(100)
  customers          customers? @relation(fields: [customerId], references: [customerId], onDelete: Restrict, onUpdate: Restrict, map: "inquiries_ibfk_1")
}

model orders {
  orderId     Int        @id @default(autoincrement()) @db.UnsignedInt
  customerId  Int?       @db.UnsignedInt
  productId   Int?       @db.UnsignedInt
  orderDate   DateTime?  @db.Date
  orderStatus String?    @db.VarChar(50)
  customers   customers? @relation(fields: [customerId], references: [customerId], onDelete: Restrict, onUpdate: Restrict, map: "orders_ibfk_1")
  products    products?  @relation(fields: [productId], references: [productId], onDelete: Restrict, onUpdate: Restrict, map: "orders_ibfk_2")

  @@index([customerId], map: "customerId")
  @@index([productId], map: "productId")
}

model products {
  productId          Int      @id @default(autoincrement()) @db.UnsignedInt
  productName        String?  @db.VarChar(100)
  productDescription String?  @db.VarChar(255)
  productPrice       Decimal? @db.Decimal(10, 2)
  orders             orders[]
}

model users {
  fullName     String? @db.VarChar(50)
  emailAddress String? @db.VarChar(100)
  phoneNumber  Int?
  postalCode   Int?
  city         String? @db.VarChar(100)
  id           Int     @id @default(autoincrement())
}

```
### Order's route file (orders.js)
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