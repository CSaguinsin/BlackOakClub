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
