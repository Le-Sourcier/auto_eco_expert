import express from "express";
// import { authorize } from "../middleware/auth.middleware.js";
import chatController from "../controllers/chatController.js";

const router = express.Router();

router
  .post("/message", chatController.createMessage) // Create a new lead
  .get("/message/:aspk", chatController.getMessages); // Get user by ID
export default router;
