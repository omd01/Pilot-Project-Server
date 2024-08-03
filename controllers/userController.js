const UserData = require("../models/UserModel");
const { sendMail } = require("../utils/sendMail");
const sendToken = require("../utils/sendToken");

// Create a new user
exports.register = async (req, res) => {
  try {
    const { name, email, password, phone, domains, country, state, city } = req.body;

    let userData = await UserData.findOne({ email });
    // User Already exists
    if (userData) {
      return res.status(400).json({ message: "Email is already registered." });
    }

    // Check if the phone number is already registered with a different email
    const existingUserWithPhone = await UserData.findOne({ phone });
    if (existingUserWithPhone && existingUserWithPhone.email !== email) {
      return res.status(400).json({ message: "Phone number is already registered with a different email." });
    }

    const otp = Math.floor(Math.random() * 1000000);

    userData = new UserData({
      name,
      email,
      password,
      phone,
      domains, // Initialize domains array directly
      country,
      state,
      city,
      otp,
      otp_expiry: new Date(Date.now() + process.env.OTP_EXPIRE * 60 * 1000),
    });

    await userData.save();

    await sendMail(email, "Verify your account", otp,userData.name);

    sendToken(
      res,
      userData,
      201,
      `${userData.name.split(" ")[0]} Welcome to LinksUs!`
    );
  } catch (error) {
    console.error("Error during registration:", error);
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: "Server error" });
  }
};

// Verify User By Email OTP
exports.verify = async (req, res) => {
  try {
      const otp = Number(req.body.otp);

      const user = await UserData.findOne(req.user._id);

      if (user.otp !== otp || user.otp_expiry < new Date()) {
          return res.status(400).json({ success: false, message: "Invalid OTP or OTP has been expired !" });
      }

      user.verified = true;
      user.otp_expiry = null;
      user.otp = null;

      await user.save();

      sendToken(res, user, 200, "Account verified");

  } catch (error) {
      res.status(400).json({ success: false, message: error.message });

  }
}

//Login user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Missing email or password" });
    }

    const user = await UserData.findOne({ email }).select("+password");

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email or password !" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email or password!" });
    }

    sendToken(res, user, 200, `Welcome back ${user.name.split(" ")[0]}`);
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

//Logout user
exports.logout = async (req, res) => {
  try {
    return res
      .status(200)
      .cookie("token", null, {
        expires: new Date(Date.now()),
      })
      .json({ success: true, message: "Logout Successful" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Fetch all form data
exports.getUserDataByID = async (req, res) => {
  try {
    const allUserData = await UserData.findById(req.user._id);
    res.status(200).json(allUserData);
  } catch (error) {
    res.status(500).send("Server error");
  }
};

// Fetch a user data by phone number
exports.getUserDataByEmail = async (req, res) => {
  try {
    const email = req.params.email;
    const formData = await UserData.findOne({ email });

    if (formData) {
      res.status(200).json(formData);
    } else {
      res.status(404).json({ message: "Form data not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update a user's form data
exports.updateUserData = async (req, res) => {
  try {
    const { phone } = req.params;
    const { name, email, domain, country, state, city } = req.body;

    const formData = await UserData.findOne({ phone });

    if (!formData) {
      return res.status(404).json({ message: "Form data not found" });
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
    res
      .status(200)
      .json({ message: "Form data updated successfully", formData });
  } catch (error) {
    res.status(500).send("Server error");
  }
};

// Delete a user's form data
exports.deleteUserData = async (req, res) => {
  try {
    const { phone } = req.params;

    const formData = await UserData.findOneAndDelete({ phone });

    if (!formData) {
      return res.status(404).json({ message: "Form data not found" });
    }

    res.status(200).json({ message: "Form data deleted successfully" });
  } catch (error) {
    res.status(500).send("Server error");
  }
};
