const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const displayAllInquiries = async (req, res) => {
    const inquiries = await prisma.inquiries.findMany();
    res.json(inquiries)
}

const deleteInquiries = async (req, res) => {
    try {
        const deleted = await prisma.inquiries.delete({ where: {inquiryId: parseInt(req.params.inquiryId) }});
        res.json({ message: "Inquiry successfuly deleted", deleted});
    } catch {
        res.status(404).json({ error: 'Inquiry not found'});
    }
}

module.exports = {
    displayAllInquiries,
    deleteInquiries
}