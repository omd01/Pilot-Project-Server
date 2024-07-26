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

    // Check if the studentEmail exists in FormData
    const formData = await FormData.findOne({ email: studentEmail });
    if (!formData) {
      // Email not found in FormData
      return res.status(400).json({ message: "Email not registered" });
    }

    if (!formData.domains.includes(domain)) {
      // Domain not registered with the provided Email

      return res.status(400).json({
        message: "Email not registered with the entered domain",
      });
    }

    // Check if the student has already applied to the same task
    const existingApplication = await Application.findOne({
      taskId,
      studentEmail,
    });

    if (existingApplication) {
      // Update the existing application's drive link
      existingApplication.driveLink = driveLink;
      await existingApplication.save();
      return res.status(200).json({
        message: "Drive link updated successfully",
      });
    }

    // Create a new application instance
    const newApplication = new Application({
      taskId,
      taskName,
      companyId,
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

// Get applications by task ID
exports.getApplicationsByTaskId = async (req, res) => {
  try {
    const { taskId } = req.query;
    const applications = await Application.find({ taskId });
    res.status(200).json(applications);
  } catch (error) {
    console.error("Error fetching applications:", error);
    res.status(500).json({ message: "Failed to fetch applications" });
  }
};

exports.updateApplicationByPhoneNumber = async (req, res) => {
  try {
    const studentNumber = req.params.phone;
    const updateData = req.body;

    // Find and update the application by studentNumber
    const updatedApplication = await Application.findOneAndUpdate(
      { studentNumber },
      updateData,
      { new: true }
    );

    if (!updatedApplication) {
      return res.status(404).json({ message: "Application not found" });
    }

    res.status(200).json(updatedApplication);
  } catch (error) {
    console.log("Error updating application:", error);
    res.status(500).json({ message: "Failed to update application" });
  }
};

exports.deleteApplicationByPhoneNumber = async (req, res) => {
  try {
    const studentNumber = req.params.phone;

    const deletedApplication = await Application.findOneAndDelete({
      studentNumber,
    });

    if (!deletedApplication) {
      return res.status(404).json({ message: "Application not found" });
    }

    res.status(200).json({ message: "Application deleted successfully" });
  } catch (error) {
    console.error("Error deleting application:", error);
    res.status(500).json({ message: "Failed to delete application" });
  }
};
