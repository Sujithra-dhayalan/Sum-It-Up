const express = require('express');
const router = express.Router();
const emailSummaryController = require('../controllers/email-summary');
const emailSender = require('../controllers/email-sender');

router.post('/summarize', emailSummaryController);
router.post('/share', emailSender);

module.exports = router;
