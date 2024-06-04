// routes/companyProfileRoutes.js

const express = require('express');
const router = express.Router();
const companyProfileController = require('../controllers/companyProfileController');

router.get('/', companyProfileController.getAllCompanyProfiles);
router.post('/', companyProfileController.createCompanyProfile);

module.exports = router;
