const express = require('express');
const {
    displayAllInquiries,
    addNewInquiries,
    deleteInquiries
} = require('../../controllers/crm/crmInquiries')
const router = express.Router();

router.get('/api/inquiries', displayAllInquiries);
router.post('/api/inquiries', addNewInquiries);
router.delete('/api/inquiries', deleteInquiries);

module.exports = router;