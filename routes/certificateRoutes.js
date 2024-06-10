// routes/certificateRoutes.js
const express = require('express');
const router = express.Router();
const certificateController = require('../controllers/certificateController');

// Route to create a new certificate
router.post('/', certificateController.createCertificate);

// Route to get all certificates
router.get('/', certificateController.getAllCertificates);

// Route to get a certificate by ID
router.get('/:id', certificateController.getCertificateById);

// Route to update a certificate by ID
router.put('/:id', certificateController.updateCertificate);

// Route to delete a certificate by ID
router.delete('/:id', certificateController.deleteCertificate);

module.exports = router;
