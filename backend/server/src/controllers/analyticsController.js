import asyncHandler from "../middlewares/asyncHandler.js";
import AppError from "../utils/AppError.js";
import { buildAnalyticsSummary } from "../services/analyticsService.js";

export const getAnalyticsSummary = asyncHandler(async (req, res) => {
  const { start, end } = req.query;

  if (!start || !end) {
    throw new AppError("start and end query parameters are required", 400);
  }

  const summary = await buildAnalyticsSummary({ start, end });
  res.status(200).json(summary);
});