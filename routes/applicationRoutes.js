const express = require('express');
const router = express.Router();
const applicationController = require('../controllers/applicationController');

router.post('/submit', applicationController.createApplication); //User
router.get('/', applicationController.getAllApplications);  //Admin

// Update application by phone number
router.put("/:phone", applicationController.updateApplicationByPhoneNumber); //Admin
// Delete application by phone number
router.delete("/:phone", applicationController.deleteApplicationByPhoneNumber); //Admin

module.exports = router;

