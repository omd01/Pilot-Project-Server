const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/db');
const formRoutes = require('./routes/formDataRoutes');
const applicationRoutes = require('./routes/applicationRoutes');
const companyProfileRoutes = require('./routes/companyProfileRoutes');
const taskRoutes = require('./routes/taskRoutes');
const certificateRoutes = require('./routes/certificateRoutes');
const SemailRoutes = require('./routes/SemailRoutes');
const CemailRoutes = require('./routes/CemailRoutes');
const app = express();
const PORT = process.env.PORT || 5000;
const cookieParser = require("cookie-parser")
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
// Connect to MongoDB
connectDB();

// Routes
app.use('/api/forms', formRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/company-profiles', companyProfileRoutes);
app.use('/api', taskRoutes);
app.use('/api/certificates', certificateRoutes);
app.use('/api/student', SemailRoutes);
app.use('/api/company', CemailRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});