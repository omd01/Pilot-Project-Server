const FormData = require('../models/FormData');

exports.submitForm = async (req, res) => {
  try {
    const { name, email, phone, domain, country, state, city } = req.body;

    // Check if a user with the same phone number and domain already exists
    const existingUser = await FormData.findOne({ phone, domain });
    if (existingUser) {
      return res.status(400).send("You have already registered with this phone number and domain.");
    }

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
    // console.log("Form data saved:", formData);
    res.status(201).send("Form data saved successfully");
  } catch (error) {
    // console.error("Error saving form data:", error);
    res.status(500).send("Server error");
  }
};
