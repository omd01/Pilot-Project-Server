const express = require('express');
const router = express.Router();
const applicationController = require('../controllers/applicationController');

router.post('/submit', applicationController.createApplication);
router.get('/', applicationController.getAllApplications);
// Update application by phone number
router.put("/applications/:phone", applicationController.updateApplicationByPhoneNumber);

// Delete application by phone number
router.delete("/applications/:phone", applicationController.deleteApplicationByPhoneNumber);


module.exports = router;