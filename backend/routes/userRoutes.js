import express from "express";
// controllers
import {
  createUser,
  loginUser,
  logoutCurrentUser,
  getAllUsers,
  getCurrentUserProfile,
  updateCurrentUserProfile,
  updateUserAdminStatus,
  deleteUser,
} from "../controllers/userController.js";

// middlewares
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .post(createUser)
  .get(authenticate, authorizeAdmin, getAllUsers);

router.post("/auth", loginUser);
router.post("/logout", logoutCurrentUser);

router
  .route("/profile")
  .get(authenticate, getCurrentUserProfile)
  .put(authenticate, updateCurrentUserProfile);

// Admin user management routes
router
  .route("/:userId/admin-status")
  .put(authenticate, authorizeAdmin, updateUserAdminStatus);

router.route("/:userId").delete(authenticate, authorizeAdmin, deleteUser);

export default router;
