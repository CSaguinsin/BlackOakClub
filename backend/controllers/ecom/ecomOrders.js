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

