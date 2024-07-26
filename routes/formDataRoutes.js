const express = require("express");
const router = express.Router();
const formController = require("../controllers/formController");


router.post("/submit", formController.submitForm);
router.get("/form-data", formController.getAllFormData);
router.get('/:email', formController.getFormDataByEmail);
router.put('/:phone', formController.updateFormData);
router.delete('/:phone', formController.deleteFormData);


module.exports = router;
