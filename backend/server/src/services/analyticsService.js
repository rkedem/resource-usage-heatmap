import Resource from "../models/Resource.js";
import UsageEvent from "../models/UsageEvent.js";

export const buildAnalyticsSummary = async ({ start, end }) => {
  const startDate = new Date(start);
  const endDate = new Date(end);

  const resources = await Resource.find().lean();
  const events = await UsageEvent.find({
    startTime: { $lt: endDate },
    endTime: { $gt: startDate }
  }).lean();

  const totalRangeMs = endDate.getTime() - startDate.getTime();

  const resourceSummaries = resources.map((resource) => {
    const resourceEvents = events.filter(
      (event) => String(event.resourceId) === String(resource._id)
    );

    const totalUsedMs = resourceEvents.reduce((sum, event) => {
      const overlapStart = Math.max(new Date(event.startTime).getTime(), startDate.getTime());
      const overlapEnd = Math.min(new Date(event.endTime).getTime(), endDate.getTime());
      return sum + Math.max(0, overlapEnd - overlapStart);
    }, 0);

    const utilizationRate = totalRangeMs > 0 ? totalUsedMs / totalRangeMs : 0;

    return {
      resourceId: resource._id,
      resourceName: resource.name,
      totalEvents: resourceEvents.length,
      totalUsedHours: Number((totalUsedMs / (1000 * 60 * 60)).toFixed(2)),
      utilizationRate: Number((utilizationRate * 100).toFixed(2))
    };
  });

  const sortedByUsage = [...resourceSummaries].sort(
    (a, b) => b.utilizationRate - a.utilizationRate
  );

  return {
    rangeStart: startDate,
    rangeEnd: endDate,
    totalResources: resources.length,
    totalUsageEvents: events.length,
    peakResource: sortedByUsage[0] || null,
    underutilizedResource: sortedByUsage[sortedByUsage.length - 1] || null,
    resourceSummaries
  };
};