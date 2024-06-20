// models/Email.js
const mongoose = require('mongoose');

const CompanyemailSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    }
});

module.exports = mongoose.model('CompanyEmail', CompanyemailSchema);
