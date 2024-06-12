// routes/emailRoutes.js
const express = require('express');
const router = express.Router();
const SemailController = require('../controllers/SemailController');

router.post('/emails', SemailController.storeEmail);

module.exports = router;
