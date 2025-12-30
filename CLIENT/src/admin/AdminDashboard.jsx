import "./Dashboard.css";

export default function AdminDashboard() {
  return (
    <div className="dashboard">

      {/* ====== TOP STATS ====== */}
      <div className="stats-grid">
        <div className="stat-card blue">
          <h4>Total Interns</h4>
          <p>120</p>
          <span>+12 this month</span>
        </div>

        <div className="stat-card green">
          <h4>Active Courses</h4>
          <p>6</p>
          <span>2 newly added</span>
        </div>

        <div className="stat-card orange">
          <h4>Pending Reviews</h4>
          <p>18</p>
          <span>Needs attention</span>
        </div>

        <div className="stat-card purple">
          <h4>Certificates Issued</h4>
          <p>42</p>
          <span>This year</span>
        </div>
      </div>

      {/* ====== PROGRESS SECTION ====== */}
      <div className="panel">
        <h3>Intern Progress Overview</h3>

        <div className="progress-row">
          <span>Android Internship</span>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: "72%" }}></div>
          </div>
          <span>72%</span>
        </div>

        <div className="progress-row">
          <span>Web Development</span>
          <div className="progress-bar">
            <div className="progress-fill green" style={{ width: "48%" }}></div>
          </div>
          <span>48%</span>
        </div>

        <div className="progress-row">
          <span>Cloud & Firebase</span>
          <div className="progress-bar">
            <div className="progress-fill purple" style={{ width: "86%" }}></div>
          </div>
          <span>86%</span>
        </div>
      </div>

      {/* ====== RECENT ACTIVITY ====== */}
      <div className="panel">
        <h3>Recent Activity</h3>
        <ul className="activity-list">
          <li>📌 New intern <b>Rahul</b> joined Android Internship</li>
          <li>📄 Assignment submitted by <b>Neha</b></li>
          <li>🎓 Certificate issued to <b>Amit</b></li>
          <li>📝 5 assignments pending review</li>
        </ul>
      </div>

    </div>
  );
}
