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
const path = require("path");
const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
connectDB();

//Home (TEMP)
app.get("/", (req, res) => {
  console.log("Serving index.html");
  res.sendFile(path.join(__dirname, "index.html"));
});

// Routes
app.use('/api/forms', formRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/company-profiles', companyProfileRoutes);
app.use('/api', taskRoutes);
app.use('/api/certificates', certificateRoutes);
app.use('/api/student', SemailRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
