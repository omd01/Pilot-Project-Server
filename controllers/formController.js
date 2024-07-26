const FormData = require("../models/FormData");

// Create or update form data
exports.submitForm = async (req, res) => {
  try {
    const { name, email, password, phone, domain, country, state, city } = req.body;

     // Check if the phone number is already registered with a different email
     const existingUserWithPhone = await FormData.findOne({ phone });
     if (existingUserWithPhone && existingUserWithPhone.email !== email) {
       return res.status(400).json({ message: "Phone number is already registered with a different email." });
     }

    let formData = await FormData.findOne({ email });

    if (formData) {
      // User with this email already exists
      if (formData.domains.includes(domain)) {
        // Domain already registered
        return res
          .status(400)
          .json({ message: "You have already registered with this email and domain. Please register with a different email or for a different domain!" });
      } else {
        // Check if the provided password matches the existing one
        if (formData.password !== password) {
          return res
            .status(400)
            .json({ message: "Email is already registered and the password you entered is incorrect. Please check your password for confirming your registration!" });
        }

        // Add new domain to the domains array and update other fields
        formData.domains.push(domain);
        formData.name = name; // Update name
        formData.phone = phone; // Update phone
        formData.country = country; // Update country
        formData.state = state; // Update state
        formData.city = city; // Update city
        await formData.save();

        return res.status(200).json({ message: "Domain added successfully." });
      }
    } else {
      // Create new document
      formData = new FormData({
        name,
        email,
        password,
        phone,
        domains: [domain], // Initialize domains array with the provided domain
        country,
        state,
        city,
      });
      await formData.save();

      return res.status(201).json({ message: "Form data saved successfully." });
    }
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: "Server error" });
  }
};

// Fetch all form data
exports.getAllFormData = async (req, res) => {
  try {
    const allFormData = await FormData.find();
    res.status(200).json(allFormData);
  } catch (error) {
   
    res.status(500).send("Server error");
  }
};

// Fetch a user data by phone number
exports.getFormDataByEmail = async (req, res) => {
  try {
    const email = req.params.email;
    const formData = await FormData.findOne({ email });

    if (formData) {
      res.status(200).json(formData);
    } else {
      res.status(404).json({ message: 'Form data not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update a user's form data
exports.updateFormData = async (req, res) => {
  try {
    const { phone } = req.params;
    const { name, email, domain, country, state, city } = req.body;

    const formData = await FormData.findOne({ phone });

    if (!formData) {
      return res.status(404).json({ message: 'Form data not found' });
    }

    // Update the user's data
    formData.name = name || formData.name;
    formData.email = email || formData.email;
    formData.country = country || formData.country;
    formData.state = state || formData.state;
    formData.city = city || formData.city;

    if (domain && !formData.domains.includes(domain)) {
      formData.domains.push(domain);
    }

    await formData.save();
    res.status(200).json({ message: 'Form data updated successfully', formData });
  } catch (error) {
  
    res.status(500).send("Server error");
  }
};

// Delete a user's form data
exports.deleteFormData = async (req, res) => {
  try {
    const { phone } = req.params;

    const formData = await FormData.findOneAndDelete({ phone });

    if (!formData) {
      return res.status(404).json({ message: 'Form data not found' });
    }

    res.status(200).json({ message: 'Form data deleted successfully' });
  } catch (error) {
   
    res.status(500).send("Server error");
  }
};
