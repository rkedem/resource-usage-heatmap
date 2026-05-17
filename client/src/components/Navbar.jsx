import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <h2>Resource Heatmap</h2>

      <div>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/resources">Resources</Link>
        <Link to="/usage-log">Log Usage</Link>
        <Link to="/analytics">Analytics</Link>
        <Link to="/">Logout</Link>
      </div>
    </nav>
  );
}

export default Navbar;