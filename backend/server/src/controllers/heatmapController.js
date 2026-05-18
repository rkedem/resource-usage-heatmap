import asyncHandler from "../middlewares/asyncHandler.js";
import AppError from "../utils/AppError.js";
import { buildHeatmapData } from "../services/heatmapService.js";

export const getHeatmap = asyncHandler(async (req, res) => {
  const { start, end, bucket = "hour", resourceIds } = req.query;

  if (!start || !end) {
    throw new AppError("start and end query parameters are required", 400);
  }

  const parsedResourceIds = resourceIds ? resourceIds.split(",") : [];

  const result = await buildHeatmapData({
    start,
    end,
    bucket,
    resourceIds: parsedResourceIds
  });

  res.status(200).json(result);
});