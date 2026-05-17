import Navbar from "../components/Navbar";

import {
  FaDesktop,
  FaBook,
  FaVideo
} from "react-icons/fa";

function Resources() {

  const resources = [
    {
      name: "Computer Lab",
      location: "Building A",
      type: "Lab",
      capacity: 30,
      status: "Active",
      usage: "40%",
      icon: <FaDesktop />
    },

    {
      name: "Study Room A",
      location: "Library",
      type: "Study Room",
      capacity: 8,
      status: "Active",
      usage: "36%",
      icon: <FaBook />
    },

    {
      name: "Projector",
      location: "Media Center",
      type: "Equipment",
      capacity: 1,
      status: "Low Usage",
      usage: "24%",
      icon: <FaVideo />
    }
  ];

  return (
    <div>

      <Navbar />

      <main className="dashboard">

        <div className="dashboard-hero">

          <div>
            <h1>Resources</h1>

            <p className="subtitle">
              Monitor availability, usage levels, and resource activity.
            </p>
          </div>

          <div className="hero-badge">
            3 Active Resources
          </div>

        </div>

        <div className="resource-grid">

          {resources.map((resource, index) => (

            <div className="resource-card" key={index}>

              <div className="resource-icon">
                {resource.icon}
              </div>

              <h3>{resource.name}</h3>

              <span className="badge">
                {resource.status}
              </span>

              <p><strong>Location:</strong> {resource.location}</p>

              <p><strong>Type:</strong> {resource.type}</p>

              <p><strong>Capacity:</strong> {resource.capacity}</p>

              <p><strong>Usage:</strong> {resource.usage}</p>

              <div className="usage-bar">
                <div
                  className="usage-fill"
                  style={{ width: resource.usage }}
                ></div>
              </div>

            </div>

          ))}

        </div>

      </main>

    </div>
  );
}

export default Resources;