const express = require("express");
const router = express.Router();
const applicationController = require("../controllers/applicationController");

router.post("/submit", applicationController.createApplication); // user
router.get("/", applicationController.getAllApplications); //admin
router.get("/count", applicationController.getApplicationsByTaskId); // user and admin
// Update application by phone number
router.put("/:phone", applicationController.updateApplicationByPhoneNumber); //admin

// Delete application by phone number
router.delete("/:phone", applicationController.deleteApplicationByPhoneNumber); //admin
module.exports = router;
