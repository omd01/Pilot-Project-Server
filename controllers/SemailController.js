// controllers/emailController.js
const StudentEmail = require('../models/StudentEmail');

exports.storeEmail = async (req, res) => {
    try {
        const email = new StudentEmail({ email: req.body.email });
        await email.save();
        res.status(201).json({ message: 'Email saved successfully' });
    } catch (error) {
        res.status(400).json({ message: 'Error saving email', error });
    }
};
