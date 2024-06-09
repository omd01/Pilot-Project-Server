const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/db');
const formRoutes = require('./routes/formDataRoutes');
const applicationRoutes = require('./routes/applicationRoutes');
const companyProfileRoutes = require('./routes/companyProfileRoutes');
const taskRoutes = require('./routes/taskRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/forms', formRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/company-profiles', companyProfileRoutes);
app.use('/api', taskRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
