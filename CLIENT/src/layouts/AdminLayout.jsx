import { Outlet, Link } from "react-router-dom";
import "./Layout.css";

export default function AdminLayout() {
  return (
    <div className="layout">
      <aside className="sidebar">
        <h2 className="logo">Admin</h2>
        <nav>
          <Link to="/admin">Dashboard</Link>
          <Link to="/admin/courses">Courses</Link>
          <Link to="/admin/interns">Interns</Link>
          <Link to="/admin/assignments">Assignments</Link>
          <Link to="/admin/submissions">Submissions</Link>
          <Link to="/admin/certificates">Certificates</Link>
        </nav>
      </aside>

      <main className="main">
        <header className="navbar">
          <span>Admin Panel</span>
          <button className="logout">Logout</button>
        </header>

        <section className="content">
          <Outlet />
        </section>
      </main>
    </div>
  );
}
