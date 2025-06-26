require('dotenv').config();

const express = require('express');
const app = express();

// Middleware
app.use(express.json());

// Authentication routes
const authRoutes = require('./routes/user/auth');
app.use(authRoutes);

// Ecommerce routes
const ecomOrderRoutes = require('./routes/ecommerce/orders');
const ecomProductRoutes = require('./routes/ecommerce/products');
app.use(ecomOrderRoutes);
app.use(ecomProductRoutes);

// CRM routes
const crmInquiriesRoute = require('./routes/crm/inquiries');
app.use(crmInquiriesRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});
