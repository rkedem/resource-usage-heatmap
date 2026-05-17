import { useState } from "react";
import Navbar from "../components/Navbar";

function UsageLog() {
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(true);
  };

  return (
    <div>
      <Navbar />

      <main className="dashboard">
        <h1>Log Resource Usage</h1>
        <p className="subtitle">Record when a resource is being used.</p>

        <div className="form-card">
          <form onSubmit={handleSubmit}>
            <label>Resource</label>
            <select required>
              <option value="">Select a resource</option>
              <option>Computer Lab</option>
              <option>Study Room A</option>
              <option>Projector</option>
            </select>

            <label>Date</label>
            <input type="date" required />

            <label>Start Time</label>
            <input type="time" required />

            <label>End Time</label>
            <input type="time" required />

            <button type="submit">Submit Usage</button>

            {success && <p className="success-message">Usage logged successfully!</p>}
          </form>
        </div>
      </main>
    </div>
  );
}

export default UsageLog;