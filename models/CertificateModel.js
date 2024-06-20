const mongoose = require("mongoose");
const sendCertificate = require("../certificate/certificate.service");

const certificateSchema = new mongoose.Schema({
  taskName: { type: String, required: true },
  taskId: { type: String, required: true },
  manager: { type: String },
  managerSign: { type: String},
  companyName: { type: String, required: true },
  companyLogo: { type: String, required: true },
  desc: { type: String, required: true },
  domain: { type: String, required: true },
  studentName: { type: String, required: true },
  studentEmail: { type: String, required: true },
  status: { type: String, default: "pending" },
  incentive: { type: String, default: null },
});


// Post-save middleware
certificateSchema.post("save", async function (doc, next) {
  await sendCertificate(doc);
  next();
});

// Post-update middleware
certificateSchema.post("findOneAndUpdate", async function (doc, next) {

  // Check if the document exists and has been updated
  if (doc) {
    const status = await sendCertificate(doc);
    if (status) {
      console.log("Updating status to sent");

      // Use the document instance method to update the status
      await doc.updateOne({ status: "sent" });
    }
  }
  next();
});

const Certificate = mongoose.model("Certificate", certificateSchema);

module.exports = Certificate;
