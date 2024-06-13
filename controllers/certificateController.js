// controllers/certificateController.js
const Certificate = require('../models/CertificateModel');

// Create a new certificate
exports.createCertificate = async (req, res) => {
  try {
    const newCertificate = new Certificate(req.body);
    await newCertificate.save();
    res.status(201).json(newCertificate);
  } catch (error) {
    res.status(400).json({ message: 'Error creating certificate', error });
  }
};

// Get all certificates
exports.getAllCertificates = async (req, res) => {
  try {
    const certificates = await Certificate.find();
    res.status(200).json(certificates);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching certificates', error });
  }
};

// Get a certificate by ID
exports.getCertificateById = async (req, res) => {
  try {
    const certificate = await Certificate.findById(req.params.id);
    if (!certificate) {
      return res.status(404).json({ message: 'Certificate not found' });
    }
    res.status(200).json(certificate);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching certificate', error });
  }
};

// Update a certificate by ID
exports.updateCertificate = async (req, res) => {
  try {
    const updatedCertificate = await Certificate.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedCertificate) {
      return res.status(404).json({ message: 'Certificate not found' });
    }
    res.status(200).json(updatedCertificate);
  } catch (error) {
    res.status(400).json({ message: 'Error updating certificate', error });
  }
};

// Delete a certificate by ID
exports.deleteCertificate = async (req, res) => {
  try {
    const deletedCertificate = await Certificate.findByIdAndDelete(req.params.id);
    if (!deletedCertificate) {
      return res.status(404).json({ message: 'Certificate not found' });
    }
    res.status(200).json({ message: 'Certificate deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting certificate', error });
  }
};

