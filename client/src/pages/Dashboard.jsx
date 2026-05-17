import Navbar from "../components/Navbar";
import SummaryCard from "../components/SummaryCard";
import Heatmap from "../components/Heatmap";
import { FaDesktop, FaChartBar, FaClock, FaDatabase } from "react-icons/fa";

function Dashboard() {
  return (
    <div>
      <Navbar />

      <main className="dashboard">
        <h1>Resource Usage Dashboard</h1>

        <p className="subtitle">
          Analyze resource usage and identify peak usage periods.
        </p>

        <div className="summary-grid">
          <SummaryCard title="Most Used Resource" value="Computer Lab" />
          <SummaryCard title="Least Used Resource" value="Projector" />
          <SummaryCard title="Total Resources" value="12" />
          <SummaryCard title="Usage Events" value="84" />
        </div>

        <Heatmap />
      </main>
    </div>
  );
}

export default Dashboard;