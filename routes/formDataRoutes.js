const express = require("express");
const router = express.Router();
const formDataController = require("../controllers/formDataController");

router.post("/submit", formDataController.submitForm);
router.get('/:phone', formDataController.getFormDataByPhone);

module.exports = router;
