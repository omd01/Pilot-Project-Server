const mongoose = require("mongoose");

const formDataSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  domains: { type: [String], required: true }, // Update to store domains as an array
  country: { type: String, required: true },
  state: { type: String, required: true },
  city: { type: String, required: true },
});

module.exports = mongoose.model('FormData', formDataSchema);

module.exports = FormData;