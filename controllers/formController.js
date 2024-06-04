// controllers/formController.js

const FormData = require('../models/FormData');

exports.submitForm = async (req, res) => {
  try {
    const { name, email, phone, domain, country, state, city } = req.body;
    const formData = new FormData({
      name,
      email,
      phone,
      domain,
      country,
      state,
      city,
    });
    await formData.save();
    console.log("Form data saved:", formData);
    res.status(201).send("Form data saved successfully");
  } catch (error) {
    console.error("Error saving form data:", error);
    res.status(500).send("Server error");
  }
};

exports.getFormData = async (req, res) => {
  try {
    const formData = await FormData.find();
    res.status(200).json(formData);
  } catch (error) {
    console.error("Error retrieving form data:", error);
    res.status(500).send("Server error");
  }
};
