const express = require('express');
const router = express.Router();
const applicationController = require('../controllers/applicationController');

router.post('/submit', applicationController.createApplication);
router.get('/', applicationController.getAllApplications);

module.exports = router;
