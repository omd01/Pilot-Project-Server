const express = require("express");
const router = express.Router();
const formDataController = require("../controllers/formDataController");

router.post("/submit", formDataController.submitForm);

module.exports = router;
