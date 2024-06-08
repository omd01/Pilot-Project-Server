const express = require("express");
const router = express.Router();
const formController = require("../controllers/formController");

router.post("/form/submit", formController.submitForm);
router.get("/form-data", formController.getAllFormData);
router.get('/form-data/:phone', formController.getUserByPhone); // New route

module.exports = router;