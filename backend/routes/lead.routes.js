import express from "express";
import { authorize } from "../middleware/auth.middleware.js";
import leadsController from "../controllers/leadController.js";

const router = express.Router();

router
  .post("/create", leadsController.register) // Create a new lead
  // .get("/me/:aspk", authorize, leadsController.getMe) // Get current lead by token
  .get("/me", authorize, leadsController.getMe); // Get current lead by token
// .get("/", leadsController.getAllLead); // Get all leads (admin only)
// .get("/:id", authMiddleware, leadsController.getLeadById); // Get lead by ID (admin only)
export default router;
