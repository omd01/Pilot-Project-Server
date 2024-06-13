const mongoose = require("mongoose");
const sendCertificate = require("../certificate/certificate.service");

const certificateSchema = new mongoose.Schema({
  taskName: { type: String, required: true },
  taskId:{type: String, required: true},
  companyManager: { type: String, required: true },
  companyManagerSignature: { type: String, required: true },
  companyName: { type: String, required: true },
  companyLogo: { type: String, required: true },
  desc: { type: String, required: true },
  domain: { type: String, required: true },
  studentName: { type: String, required: true },
  studentEmail: { type: String, required: true },
  status: { type: String ,default: "pending"},
  incentive: { type: String, default:null },
});
// Post-save middleware
certificateSchema.post("save", function (doc) {
  sendCertificate(doc);
});

// Post-update middleware
certificateSchema.post("findOneAndUpdate", function (doc) {
  sendCertificate(doc);
});

const Certificate = mongoose.model("Certificate", certificateSchema);

module.exports = Certificate;
