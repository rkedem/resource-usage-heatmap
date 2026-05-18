import Resource from "../models/Resource.js";
import UsageEvent from "../models/UsageEvent.js";
import { getBucketSizeMs, floorToBucket, formatBucketLabel, getOverlapMs } from "../utils/time.js";

export const buildHeatmapData = async ({ start, end, bucket = "hour", resourceIds = [] }) => {
  const startDate = new Date(start);
  const endDate = new Date(end);

  const bucketSizeMs = getBucketSizeMs(bucket);
  const firstBucket = floorToBucket(startDate, bucket);

  const resourceQuery = resourceIds.length
    ? { _id: { $in: resourceIds } }
    : {};

  const resources = await Resource.find(resourceQuery).sort({ name: 1 });

  const usageQuery = {
    startTime: { $lt: endDate },
    endTime: { $gt: startDate }
  };

  if (resourceIds.length) {
    usageQuery.resourceId = { $in: resourceIds };
  }

  const events = await UsageEvent.find(usageQuery).lean();

  const bucketStarts = [];
  for (let t = firstBucket.getTime(); t < endDate.getTime(); t += bucketSizeMs) {
    bucketStarts.push(new Date(t));
  }

  const times = bucketStarts.map((b) => formatBucketLabel(b, bucket));

  const data = resources.map((resource) => {
    const values = bucketStarts.map((bucketStart) => {
      const bucketEnd = new Date(bucketStart.getTime() + bucketSizeMs);

      const totalMs = events
        .filter((event) => String(event.resourceId) === String(resource._id))
        .reduce((sum, event) => {
          return sum + getOverlapMs(event.startTime, event.endTime, bucketStart, bucketEnd);
        }, 0);

      const intensity = totalMs / bucketSizeMs;
      const scaled = Number((intensity * 5).toFixed(2));

      return Math.min(5, scaled);
    });

    return {
      resource: resource.name,
      values
    };
  });

  return {
    meta: {
      bucket,
      rangeStart: startDate,
      rangeEnd: endDate
    },
    times,
    data
  };
};