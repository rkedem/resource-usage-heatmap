import express from "express";
import {
  createResource,
  getResources,
  getResourceById,
  updateResource,
  deleteResource
} from "../controllers/resourceController.js";

const router = express.Router();

router.route("/").get(getResources).post(createResource);
router.route("/:id").get(getResourceById).put(updateResource).delete(deleteResource);

export default router;