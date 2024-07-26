// routes/companyProfileRoutes.js

const express = require('express');
const router = express.Router();
const companyProfileController = require('../controllers/companyProfileController');

router.get('/', companyProfileController.getAllCompanyProfiles); //User 
router.post('/', companyProfileController.createCompanyProfile);  //Admin
router.get('/:companyId', companyProfileController.getCompanyProfileById);  //Admin
router.put('/:companyId', companyProfileController.updateCompanyProfile);  //Admin
router.delete('/:companyId', companyProfileController.deleteCompanyProfile) //Admin

module.exports = router;

