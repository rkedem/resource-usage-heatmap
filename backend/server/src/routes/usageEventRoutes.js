import express from "express";
import {
  createUsageEvent,
  getUsageEvents,
  getUsageEventById,
  updateUsageEvent,
  deleteUsageEvent
} from "../controllers/usageEventController.js";

const router = express.Router();

router.route("/").get(getUsageEvents).post(createUsageEvent);
router.route("/:id").get(getUsageEventById).put(updateUsageEvent).delete(deleteUsageEvent);

export default router;