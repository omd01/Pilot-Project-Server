const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController.js");
const isAuthenticated  = require("../middlewares/auth.js")

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/logout", userController.logout);
router.get("/form-data",isAuthenticated, userController.getAllUserData);
router.get('/:email',isAuthenticated, userController.getUserDataByEmail);
router.put('/:phone',isAuthenticated, userController.updateUserData);
router.delete('/:phone',isAuthenticated, userController.deleteUserData);


module.exports = router;
