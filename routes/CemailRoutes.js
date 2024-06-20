// routes/emailRoutes.js
const express = require('express');
const router = express.Router();
const CemailController = require('../controllers/CemailController');

router.post('/emails', CemailController.storeEmail);

module.exports = router;
