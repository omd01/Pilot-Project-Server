const FormData = require("../models/FormData");
const sendToken = require("../utils/sendToken");

// Create or update form data
exports.submitForm = async (req, res) => {
  try {
    const { name, email, phone, domain, country, state, city ,isAdmin} = req.body;

    let formData = await FormData.findOne({ phone });

    if (formData) {
      // User with this phone number already exists
      if (formData.domains.includes(domain)) {
        // Domain already registered
        return res
          .status(400)
          .send(
            "You have already registered with this phone number and domain."
          );
      } else {
        // Add new domain to the domains array
        formData.domains.push(domain);
        formData.name = name; // Update name
        formData.email = email; // Update email
        formData.country = country; // Update country
        formData.state = state; // Update state
        formData.city = city; // Update city
        await formData.save();
       
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
        isAdmin
      });
      await formData.save();
    
      sendToken(
        res,
        formData
        , 201,
        `${(formData.name).split(" ")[0]} Welcome to LinksUs !`
    );
    }
  } catch (error) {
    console.error("Error saving form data:", error);
    if (error.name === 'ValidationError') {
      return res.status(400).send(error.message);
    }
    res.status(500).send("Server error");
  }
};

//Logout user
exports.logout = async (req, res) => {
  try {
      return res.status(200).cookie("token", null, {
          expires: new Date(Date.now()),
      })
          .json({ success: true, message: "Logout Successful" });


  } catch (error) {
      res.status(400).json({ success: false, message: error.message });
  }
}

// Fetch all form data
exports.getAllFormData = async (req, res) => {
  try {
    const allFormData = await FormData.find();
    console.log("All form data:", allFormData);
    res.status(200).json(allFormData);
  } catch (error) {
   
    res.status(500).send("Server error");
  }
};

// Fetch a user data by phone number
exports.getFormDataByPhone = async (req, res) => {
  try {
    const phone = req.params.phone;
    const formData = await FormData.findOne({ phone });

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
