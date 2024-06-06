// controllers/companyProfileController.js

const CompanyProfile = require('../models/CompanyProfile');

// Get all company profiles
exports.getAllCompanyProfiles = async (req, res) => {
  try {
    const companyProfiles = await CompanyProfile.find();
    res.status(200).json(companyProfiles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new company profile
exports.createCompanyProfile = async (req, res) => {
  const { companyLogo, companyName, companyId } = req.body;

  const newCompanyProfile = new CompanyProfile({
    companyLogo,
    companyName,
    companyId
  });

  try {
    await newCompanyProfile.save();
    res.status(201).json(newCompanyProfile);
  } catch (error) {
    if (error.code === 11000) { // Duplicate key error
      res.status(400).json({ message: 'Company with this ID already exists.' });
    } else {
      res.status(400).json({ message: error.message });
    }
  }
};
