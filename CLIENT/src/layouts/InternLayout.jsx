import { Outlet, Link } from "react-router-dom";
import "./Layout.css";

export default function InternLayout() {
  return (
    <div className="layout">
      <aside className="sidebar">
        <h2 className="logo">Intern</h2>
        <nav>
          <Link to="/intern">Dashboard</Link>
          <Link to="/intern/courses">My Courses</Link>
          <Link to="/intern/assignments">Assignments</Link>
          <Link to="/intern/progress">Progress</Link>
          <Link to="/intern/certificate">Certificate</Link>
        </nav>
      </aside>

      <main className="main">
        <header className="navbar">
          <span>Intern Panel</span>
          <button className="logout">Logout</button>
        </header>

        <section className="content">
          <Outlet />
        </section>
      </main>
    </div>
  );
}
