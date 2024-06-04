const mongoose = require('mongoose');

const FormDataSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  domain: { type: String, required: true },
  country: { type: String, required: true },
  state: { type: String, required: true },
  city: { type: String, required: true },
});

module.exports = mongoose.model('FormData', FormDataSchema);
