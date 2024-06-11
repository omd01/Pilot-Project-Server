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
  const { companyLogo, companyName, desc, companyId } = req.body;

  const newCompanyProfile = new CompanyProfile({
    companyLogo,
    companyName,
    desc,
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

// Get a company profile by companyId
exports.getCompanyProfileById = async (req, res) => {
  const { companyId } = req.params;

  try {
    const companyProfile = await CompanyProfile.findOne({ companyId });

    if (!companyProfile) {
      return res.status(404).json({ message: 'Company profile not found.' });
    }

    res.status(200).json(companyProfile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a company profile
exports.updateCompanyProfile = async (req, res) => {
  const { companyId } = req.params;
  const { companyLogo, companyName, desc } = req.body;

  try {
    const updatedProfile = await CompanyProfile.findOneAndUpdate(
      { companyId },
      { companyLogo, companyName, desc },
      // { new: true }
    );

    if (!updatedProfile) {
      return res.status(404).json({ message: 'Company profile not found.' });
    }

    res.status(200).json(updatedProfile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a company profile
exports.deleteCompanyProfile = async (req, res) => {
  const { companyId } = req.params;

  try {
    const deletedProfile = await CompanyProfile.findOneAndDelete({ companyId });

    if (!deletedProfile) {
      return res.status(404).json({ message: 'Company profile not found.' });
    }

    res.status(200).json({ message: 'Company profile deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};