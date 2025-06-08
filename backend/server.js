const express = require('express');
const app = express();
// // admin routes
// const adminDashboardRoutes = require('./routes/admin/dashboard');
// const adminReportsRoutes = require('./routes/admin/reports');

// app.use(adminDashboardRoutes);
// app.use(adminReportsRoutes);
// // crm routes
// const crmInquiriesRoutes = require('./routes/crm/inquiries');
// const crmLeadsRoutes = require('./routes/crm/leads');
// const crmTicketRoutes = require('./routes/crm/tickets');

// app.use(crmInquiriesRoutes);
// app.use(crmLeadsRoutes);
// app.use(crmTicketRoutes);
// // ecommerce routes
// const ecomCategoriesRoutes = require('./routes/ecommerce/categories');
// const ecomOrderRoutes = require('./routes/ecommerce/orders');
const ecomProductRoutes = require('./routes/ecommerce/products');
app.use(express.json());
// app.use(ecomCategoriesRoutes);
// app.use(ecomOrderRoutes);
app.use(ecomProductRoutes);
// // user routes
// const userAuthRoute = require('./routes/user/auth');
// const userProfileRoute = require('./routes/user/profile');
// const usersRoute = require('./routes/user/users');

// app.use(userAuthRoute);
// app.use(userProfileRoute);
// app.use(usersRoute);


app.use(express.json());
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
