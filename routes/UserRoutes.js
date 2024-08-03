const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController.js");
const isAuthenticated  = require("../middlewares/auth.js")

router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/verify",isAuthenticated, userController.verify);
router.get("/me",isAuthenticated, userController.getUserDataByID);
router.get('/:email',isAuthenticated, userController.getUserDataByEmail);
// router.put('/:phone',isAuthenticated, userController.updateUserData); Admin
router.delete('/:phone',isAuthenticated, userController.deleteUserData);
router.get("/logout", userController.logout);


module.exports = router;
