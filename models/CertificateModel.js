const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema({
  taskId: { type: String, required: true },
  taskName: { type: String, required: true },
  companyManager: { type: String },
  companyManagerSignature: { type: String},
  companyName: { type: String, required: true },
  companyLogo: { type: String, required: true },
  desc: { type: String, required: true },
  domain: { type: String, required: true },
  studentName: { type: String, required: true },
  studentEmail: { type: String, required: true },
  status: { type: String ,default: "pending"},
  incentive: { type: String, default:null },
});

const Certificate = mongoose.model('Certificate', certificateSchema);

module.exports = Certificate;
