// routes/companyProfileRoutes.js

const express = require('express');
const router = express.Router();
const companyProfileController = require('../controllers/companyProfileController');

router.get('/', companyProfileController.getAllCompanyProfiles);
router.post('/', companyProfileController.createCompanyProfile);
router.get('/:companyId', companyProfileController.getCompanyProfileById);

module.exports = router;