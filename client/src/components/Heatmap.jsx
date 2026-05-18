import { useEffect, useState } from "react";

function Heatmap() {
  const [heatmap, setHeatmap] = useState({
    times: [],
    data: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const fetchHeatmap = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch("/api/heatmap", {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch heatmap data (${response.status})`);
        }

        const result = await response.json();

        setHeatmap({
          times: Array.isArray(result.times) ? result.times : [],
          data: Array.isArray(result.data) ? result.data : [],
        });
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(
            err.message || "Something went wrong while loading heatmap data."
          );
        }
      } finally {
        setLoading(false);
      }
    };

    fetchHeatmap();

    return () => {
      controller.abort();
    };
  }, []);

  const getColor = (value) => {
    if (value === 0) return "level-0";
    if (value <= 2) return "level-1";
    if (value <= 4) return "level-2";
    return "level-3";
  };

  if (loading) {
    return (
      <div className="heatmap-container">
        <h2>Resource Usage Heatmap</h2>
        <p>Loading heatmap data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="heatmap-container">
        <h2>Resource Usage Heatmap</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="heatmap-container">
      <h2>Resource Usage Heatmap</h2>

      <div className="heatmap-grid">
        <div></div>

        {heatmap.times.map((time) => (
          <div className="heatmap-label" key={time}>
            {time}
          </div>
        ))}

        {heatmap.data.map((row) => (
          <div key={row.resource} style={{ display: "contents" }}>
            <div className="resource-label">{row.resource}</div>

            {row.values.map((value, index) => (
              <div
                key={`${row.resource}-${index}`}
                className={`heatmap-cell ${getColor(value)}`}
              >
                {value}
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="legend">
        <span>
          <div className="legend-box level-0"></div>
          No Usage
        </span>

        <span>
          <div className="legend-box level-1"></div>
          Low
        </span>

        <span>
          <div className="legend-box level-2"></div>
          Medium
        </span>

        <span>
          <div className="legend-box level-3"></div>
          High
        </span>
      </div>
    </div>
  );
}

export default Heatmap;