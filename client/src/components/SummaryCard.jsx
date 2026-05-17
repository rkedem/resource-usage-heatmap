import {
  FaDesktop,
  FaProjectDiagram,
  FaDatabase,
  FaChartBar
} from "react-icons/fa";

function SummaryCard({ title, value }) {

  const getIcon = () => {
    if (title === "Most Used Resource") {
      return <FaDesktop className="summary-icon" />;
    }

    if (title === "Least Used Resource") {
      return <FaProjectDiagram className="summary-icon" />;
    }

    if (title === "Total Resources") {
      return <FaDatabase className="summary-icon" />;
    }

    if (title === "Usage Events") {
      return <FaChartBar className="summary-icon" />;
    }
  };

  return (
    <div className="summary-card">
      {getIcon()}
      <h3>{title}</h3>
      <p>{value}</p>
    </div>
  );
}

export default SummaryCard;