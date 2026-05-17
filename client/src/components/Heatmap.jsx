function Heatmap() {
  const data = [
    { resource: "Study Room A", values: [1, 3, 5, 2, 4] },
    { resource: "Computer Lab", values: [2, 4, 3, 5, 3] },
    { resource: "Projector", values: [0, 2, 3, 1, 4] },
  ];

  const times = ["9 AM", "10 AM", "11 AM", "12 PM", "1 PM"];

  const getColor = (value) => {
    if (value === 0) return "level-0";
    if (value <= 2) return "level-1";
    if (value <= 4) return "level-2";
    return "level-3";
  };

  return (
    <div className="heatmap-container">
      <h2>Resource Usage Heatmap</h2>

      <div className="heatmap-grid">
        <div></div>

        {times.map((time) => (
          <div className="heatmap-label" key={time}>
            {time}
          </div>
        ))}

        {data.map((row) => (
          <>
            <div className="resource-label" key={row.resource}>
              {row.resource}
            </div>

            {row.values.map((value, index) => (
              <div
                key={index}
                className={`heatmap-cell ${getColor(value)}`}
              >
                {value}
              </div>
            ))}
          </>
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