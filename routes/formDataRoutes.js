const express = require("express");
const router = express.Router();
const formController = require("../controllers/formController");

router.post("/submit", formController.submitForm);
router.get("/form-data", formController.getAllFormData);
router.get('/:phone', formController.getUserByPhone);

module.exports = router;
