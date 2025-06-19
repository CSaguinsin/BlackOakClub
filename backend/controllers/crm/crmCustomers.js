const prisma = new PrismaClient();

const getAllCustomers = async (req, res) => {
  const customers = await prisma.customer.findMany();
  res.json(customers);
};

const getCustomerById = async (req, res) => {
  const id = parseInt(req.params.id);
  const customer = await prisma.customer.findUnique({ where: { id } });
  if (!customer) return res.status(404).json({ error: 'Customer not found' });
  res.json(customer);
};


const updateCustomer = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const updatedCustomer = await prisma.customer.update({
      where: { id },
      data: { ...req.body }
    });
    res.json(updatedCustomer);
  } catch {
    res.status(404).json({ error: 'Customer not found' });
  }
};

const deleteCustomer = async (req, res) => {
  try {
    const deleted = await prisma.customer.delete({ where: { id: parseInt(req.params.id) } });
    res.json({ message: 'Customer deleted successfully', deleted });
  } catch {
    res.status(404).json({ error: 'Customer not found' });
  }
};


module.exports = {
    getAllCustomers,
    getCustomerById,
    updateCustomer,
    deleteCustomer
}