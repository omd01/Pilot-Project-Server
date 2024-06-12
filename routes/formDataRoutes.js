const express = require("express");
const router = express.Router();
const formDataController = require("../controllers/formDataController");

router.post("/submit", formDataController.submitForm);
router.get("/form-data", formDataController.getAllFormData);
router.get('/:phone', formDataController.getFormDataByPhone);
router.put('/:phone', formDataController.updateFormData);
router.delete('/:phone', formDataController.deleteFormData);

module.exports = router;
