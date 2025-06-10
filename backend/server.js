const express = require('express');
const app = express();
// // ecommerce routes
const ecomOrderRoutes = require('./routes/ecommerce/orders');
const ecomProductRoutes = require('./routes/ecommerce/products');
app.use(express.json());
app.use(ecomOrderRoutes);
app.use(ecomProductRoutes);

app.use(express.json());
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
