export const BUCKET_MINUTES = {
  hour: 60,
  day: 1440,
  week: 10080
};

export const getBucketSizeMs = (bucket) => {
  const minutes = BUCKET_MINUTES[bucket];
  if (!minutes) throw new Error("Invalid bucket type");
  return minutes * 60 * 1000;
};

export const floorToBucket = (date, bucket) => {
  const d = new Date(date);

  if (bucket === "hour") {
    d.setMinutes(0, 0, 0);
    return d;
  }

  if (bucket === "day") {
    d.setHours(0, 0, 0, 0);
    return d;
  }

  if (bucket === "week") {
    const day = d.getDay();
    const diff = d.getDate() - day;
    d.setDate(diff);
    d.setHours(0, 0, 0, 0);
    return d;
  }

  throw new Error("Invalid bucket type");
};

export const formatBucketLabel = (date, bucket) => {
  const d = new Date(date);

  if (bucket === "hour") {
    return d.toLocaleTimeString([], { hour: "numeric" });
  }

  if (bucket === "day") {
    return d.toLocaleDateString([], { month: "short", day: "numeric" });
  }

  if (bucket === "week") {
    return `Week of ${d.toLocaleDateString([], { month: "short", day: "numeric" })}`;
  }

  return d.toISOString();
};

export const getOverlapMs = (startA, endA, startB, endB) => {
  const start = Math.max(new Date(startA).getTime(), new Date(startB).getTime());
  const end = Math.min(new Date(endA).getTime(), new Date(endB).getTime());
  return Math.max(0, end - start);
};