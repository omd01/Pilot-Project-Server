const Application = require("../models/applicationModel");
const FormData = require("../models/FormData");

exports.createApplication = async (req, res) => {
  try {
    const {
      taskId,
      taskName,
      companyId,
      companyName,
      domain,
      studentName,
      studentNumber,
      studentEmail,
      driveLink,
    } = req.body;

    // Check if the studentNumber exists in FormData
    const formData = await FormData.findOne({ phone: studentNumber });
    console.log(formData);
    if (!formData) {
      // Phone number not found in FormData
      return res.status(400).json({ message: "Phone number not registered" });
    }

    if (!formData.domains.includes(domain)) {
      // Domain not registered with the provided phone number
      return res.status(400).json({ message: "Phone number not registered with the entered domain" });
    }

    // Create a new application instance
    const newApplication = new Application({
      taskId,
      taskName,
      companyName,
      companyId,
      domain,
      studentName,
      studentNumber,
      studentEmail,
      driveLink,
    });

    // Save the application to the database
    await newApplication.save();

    res.status(201).json({ message: "Application submitted successfully" });
  } catch (error) {
    console.error("Error submitting application:", error);
    res.status(500).json({ message: "Failed to submit application" });
  }
};

exports.getAllApplications = async (req, res) => {
  try {
    const applications = await Application.find();
    res.status(200).json(applications);
  } catch (error) {
    console.error("Error fetching applications:", error);
    res.status(500).json({ message: "Failed to fetch applications" });
  }
};

exports.updateApplicationByPhoneNumber = async (req, res) => {
  try {
    const { phone } = req.params;
    const updateData = req.body;

    // Find and update the application by studentNumber
    const updatedApplication = await Application.findOneAndUpdate(
      { phone },
      updateData,
      { new: true }
    );

    if (!updatedApplication) {
      return res.status(404).json({ message: "Application not found" });
    }

    res.status(200).json(updatedApplication);
  } catch (error) {
    console.error("Error updating application:", error);
    res.status(500).json({ message: "Failed to update application" });
  }
};

exports.deleteApplicationByPhoneNumber = async (req, res) => {
  try {
    const { studentNumber } = req.params;

    // Find and delete the application by studentNumber
    const deletedApplication = await Application.findOneAndDelete({ studentNumber });

    if (!deletedApplication) {
      return res.status(404).json({ message: "Application not found" });
    }

    res.status(200).json({ message: "Application deleted successfully" });
  } catch (error) {
    console.error("Error deleting application:", error);
    res.status(500).json({ message: "Failed to delete application" });
  }
};
