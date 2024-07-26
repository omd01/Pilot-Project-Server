const express = require("express");
const router = express.Router();
const formController = require("../controllers/formController");
const isAuthenticated  = require("../middlewares/auth.js")

router.post("/submit", formController.submitForm);
router.get("/logout", formController.logout);
router.get("/form-data",isAuthenticated, formController.getAllFormData);
router.get('/:email',isAuthenticated, formController.getFormDataByEmail);
router.put('/:phone',isAuthenticated, formController.updateFormData);
router.delete('/:phone',isAuthenticated, formController.deleteFormData);


module.exports = router;
