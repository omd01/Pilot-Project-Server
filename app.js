const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const FormData = require("./models/FormData");

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.post("/submit", async (req, res) => {
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
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
