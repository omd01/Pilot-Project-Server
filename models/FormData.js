const mongoose = require("mongoose");

const formDataSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return /^\d{10}$/.test(v); // Validate phone number is 10 digits
      },
      message:"Phone number is not valid!"
    }
  },
  domains: { type: [String], required: true },
  country: { type: String },
  state: { type: String },
  city: { type: String },
});

const FormData = mongoose.model("FormData", formDataSchema);

module.exports = FormData;