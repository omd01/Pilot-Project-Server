const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema({
  taskId: { type: String, required: true },
  companyId: { type: String, required: true },
  desc: { type: String, required: true },
  studentNumber: { type: String, required: true },
  status: { type: String, required: true },
  incentive: { type: String, required: true }, 
});

const Certificate = mongoose.model('Certificate', certificateSchema);

module.exports = Certificate;
