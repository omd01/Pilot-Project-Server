// routes/companyProfileRoutes.js

const express = require('express');
const router = express.Router();
const companyProfileController = require('../controllers/companyProfileController');

router.get('/', companyProfileController.getAllCompanyProfiles);
router.post('/', companyProfileController.createCompanyProfile);
router.get('/:companyId', companyProfileController.getCompanyProfileById);
router.put('/:companyId', companyProfileController.updateCompanyProfile);
router.delete('/:companyId', companyProfileController.deleteCompanyProfile)


module.exports = router;