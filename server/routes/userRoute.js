const express = require("express");
const { registerUser, loginUser, logoutUser, forgotPassword, resetPassword, getUserDetails, updatePassword, updateUserProfile, getAllUsers, getSingleUserDetail,updateUserRole, deleteUser } = require('../controllers/userController');
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");


const router = express.Router();


router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/logout").get(logoutUser);
router.route("/profile").get(isAuthenticatedUser,getUserDetails);
router.route("/password/update").put(isAuthenticatedUser,updatePassword);
router.route("/profile/update").put(isAuthenticatedUser,updateUserProfile);
router.route("/admin/users").get(isAuthenticatedUser,authorizeRoles("admin"),getAllUsers);
router.route("/admin/users/:id").get(isAuthenticatedUser,authorizeRoles("admin"),getSingleUserDetail).put(isAuthenticatedUser,authorizeRoles("admin"),updateUserRole).delete(isAuthenticatedUser,authorizeRoles("admin"), deleteUser);

module.exports = router

