const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  taskId: { type: String, required: true },
  taskName: { type: String, required: true },
  companyId: { type: String, required: true },
  companyName: { type: String, required: true },
  domain: { type: String, required: true },
  studentName: { type: String, required: true },
  studentNumber: { type: String, required: true },
  studentEmail: { type: String, required: true },
  driveLink: { type: String, required: true },
});

const Application = mongoose.model("Application", applicationSchema);

module.exports = Application;
