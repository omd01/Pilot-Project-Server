// models/Email.js
const mongoose = require('mongoose');

const StudentemailSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    }
});

module.exports = mongoose.model('StudentEmail', StudentemailSchema);
