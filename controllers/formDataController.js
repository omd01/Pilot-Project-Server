const FormData = require("../models/FormData");

// Create or update form data
exports.submitForm = async (req, res) => {
  try {
    const { name, email, phone, domain, country, state, city } = req.body;

    let formData = await FormData.findOne({ phone });

    if (formData) {
      // User with this phone number already exists
      if (formData.domains.includes(domain)) {
        // Domain already registered
        return res.status(400).send("You have already registered with this phone number and domain.");
      } else {
        // Add new domain to the domains array
        formData.domains.push(domain);
        formData.name = name; // Update name
        formData.email = email; // Update email
        formData.country = country; // Update country
        formData.state = state; // Update state
        formData.city = city; // Update city
        await formData.save();
        console.log("Form data updated:", formData);
        return res.status(200).send("Domain added successfully.");
      }
    } else {
      // Create new document
      formData = new FormData({
        name,
        email,
        phone,
        domains: [domain], // Initialize domains array with the provided domain
        country,
        state,
        city,
      });
      await formData.save();
      console.log("Form data saved:", formData);
      return res.status(201).send("Form data saved successfully.");
    }
  } catch (error) {
    console.error("Error saving form data:", error);
    res.status(500).send("Server error");
  }
};
