const Application = require("../models/applicationModel");
const FormData = require("../models/FormData");

exports.createApplication = async (req, res) => {
  try {
    const {
      taskId,
      taskName,
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
        return res.status(400).json({ message: 'Phone number not registered with the entered domain' });
    }
    
    // Create a new application instance
    const newApplication = new Application({
      taskId,
      taskName,
      companyName,
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