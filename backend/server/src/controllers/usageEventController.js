import UsageEvent from "../models/UsageEvent.js";
import Resource from "../models/Resource.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import AppError from "../utils/AppError.js";

export const createUsageEvent = asyncHandler(async (req, res) => {
  const { resourceId, startTime, endTime } = req.body;

  const resource = await Resource.findById(resourceId);
  if (!resource) {
    throw new AppError("Resource not found", 404);
  }

  const usageEvent = await UsageEvent.create({
    ...req.body,
    startTime: new Date(startTime),
    endTime: new Date(endTime)
  });

  res.status(201).json(usageEvent);
});

export const getUsageEvents = asyncHandler(async (req, res) => {
  const { resourceId, start, end } = req.query;

  const query = {};

  if (resourceId) query.resourceId = resourceId;

  if (start && end) {
    query.startTime = { $lt: new Date(end) };
    query.endTime = { $gt: new Date(start) };
  }

  const events = await UsageEvent.find(query)
    .populate("resourceId", "name category location")
    .sort({ startTime: -1 });

  res.status(200).json(events);
});

export const getUsageEventById = asyncHandler(async (req, res) => {
  const event = await UsageEvent.findById(req.params.id).populate("resourceId");
  if (!event) {
    throw new AppError("Usage event not found", 404);
  }
  res.status(200).json(event);
});

export const updateUsageEvent = asyncHandler(async (req, res) => {
  const payload = { ...req.body };

  if (payload.startTime) payload.startTime = new Date(payload.startTime);
  if (payload.endTime) payload.endTime = new Date(payload.endTime);

  const event = await UsageEvent.findByIdAndUpdate(req.params.id, payload, {
    new: true,
    runValidators: true
  });

  if (!event) {
    throw new AppError("Usage event not found", 404);
  }

  res.status(200).json(event);
});

export const deleteUsageEvent = asyncHandler(async (req, res) => {
  const event = await UsageEvent.findByIdAndDelete(req.params.id);

  if (!event) {
    throw new AppError("Usage event not found", 404);
  }

  res.status(200).json({ message: "Usage event deleted successfully" });
});