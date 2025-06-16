const inquiries = require('../../data/mockEcomDB');

const displayAllInquiries = (req, res) => {
    res.json(inquiries)
};


const deleteInquiries = (req, res) => {
    const id = parseInt(req.params.id);
    const index = inquiries.findIndex(updateInquiry => updateInquiry.id === id);
    if(index !== -1) {
        const deleted = inquiries.splice(index, 1);
        return res.json({ message: 'Customer Inquiry deleted', deleted});
    }
    res.status(404).json({ error: 'Inquiry not found'})
}

module.exports = {
    displayAllInquiries,
    deleteInquiries
}