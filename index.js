// index.js

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors'); 
const companyProfileRoutes = require('./routes/companyProfileRoutes');
const formRoutes = require('./routes/formRoutes'); // Add this line
const taskRoutes = require('./routes/taskRoutes');

dotenv.config();

const app = express();
const port = process.env.PORT || 3005;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/company-profiles', companyProfileRoutes);
app.use('/api', formRoutes); // Add this line
app.use('/api', taskRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('Connected to MongoDB'))
.catch((error) => console.error('Could not connect to MongoDB', error));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
