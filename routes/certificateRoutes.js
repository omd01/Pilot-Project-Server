// routes/certificateRoutes.js
const express = require('express');
const router = express.Router();
const certificateController = require('../controllers/certificateController');

// Route to create a new certificate
router.post('/', certificateController.createCertificate);  //USER

// Route to get all certificates
router.get('/', certificateController.getAllCertificates); //Admin

// Route to get a certificate by ID
router.get('/:id', certificateController.getCertificateById); //Admin

// Route to get a certificate by Task ID
router.get('/taskid/:taskid', certificateController.getCertificateByTaskId); //Admin

// Route to update a certificate by ID
router.put('/:id', certificateController.updateCertificate); //Admin

// Route to delete a certificate by ID
router.delete('/:id', certificateController.deleteCertificate); //Admin

module.exports = router;
