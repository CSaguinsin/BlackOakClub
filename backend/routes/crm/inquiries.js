const express = require('express');
const {
    displayAllInquiries,
    deleteInquiries
} = require('../../controllers/crm/crmInquiries')
const router = express.Router();

router.get('/api/inquiries', displayAllInquiries);
router.delete('/api/inquiries/:id', deleteInquiries);

module.exports = router;