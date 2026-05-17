import Navbar from "../components/Navbar";
import SummaryCard from "../components/SummaryCard";

function Analytics() {
  return (
    <div>
      <Navbar />

      <main className="dashboard">
        <h1>Analytics Panel</h1>

        <p className="subtitle">
          View usage insights, peak hours, and underutilized resources.
        </p>

        <div className="summary-grid">
          <SummaryCard title="Peak Usage Time" value="11 AM / 1 PM" />
          <SummaryCard title="Busiest Resource" value="Computer Lab" />
          <SummaryCard title="Underused Resource" value="Projector" />
          <SummaryCard title="Average Daily Usage" value="28" />
        </div>

        <div className="heatmap-container">
          <h2>Resource Usage Overview</h2>

          <div className="bar-chart">
            <div className="bar-row">
              <span>Computer Lab</span>
              <div className="bar-bg">
                <div className="bar-fill" style={{ width: "40%" }}>40%</div>
              </div>
            </div>

            <div className="bar-row">
              <span>Study Room A</span>
              <div className="bar-bg">
                <div className="bar-fill" style={{ width: "36%" }}>36%</div>
              </div>
            </div>

            <div className="bar-row">
              <span>Projector</span>
              <div className="bar-bg">
                <div className="bar-fill low" style={{ width: "24%" }}>24%</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Analytics;