const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/db');
const formRoutes = require('./routes/formDataRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/forms', formRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
