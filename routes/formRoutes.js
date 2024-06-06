const express = require("express");
const router = express.Router();
const formController = require("../controllers/formController");

router.post("/form/submit", formController.submitForm);
router.get("/form-data", formController.getAllFormData);

module.exports = router;