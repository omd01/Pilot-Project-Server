// controllers/emailController.js
const CompanyEmail = require('../models/CompanyEmail');

exports.storeEmail = async (req, res) => {
    try {
        const email = new CompanyEmail({ email: req.body.email });
        await email.save();
        res.status(201).json({ message: 'Email saved successfully' });
    } catch (error) {
        res.status(400).json({ message: 'Error saving email', error });
    }
};
