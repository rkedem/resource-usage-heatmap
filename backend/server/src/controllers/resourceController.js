import Resource from "../models/Resource.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import AppError from "../utils/AppError.js";

export const createResource = asyncHandler(async (req, res) => {
  const resource = await Resource.create(req.body);
  res.status(201).json(resource);
});

export const getResources = asyncHandler(async (req, res) => {
  const resources = await Resource.find().sort({ createdAt: -1 });
  res.status(200).json(resources);
});

export const getResourceById = asyncHandler(async (req, res) => {
  const resource = await Resource.findById(req.params.id);
  if (!resource) {
    throw new AppError("Resource not found", 404);
  }
  res.status(200).json(resource);
});

export const updateResource = asyncHandler(async (req, res) => {
  const resource = await Resource.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!resource) {
    throw new AppError("Resource not found", 404);
  }

  res.status(200).json(resource);
});

export const deleteResource = asyncHandler(async (req, res) => {
  const resource = await Resource.findByIdAndDelete(req.params.id);

  if (!resource) {
    throw new AppError("Resource not found", 404);
  }

  res.status(200).json({ message: "Resource deleted successfully" });
});