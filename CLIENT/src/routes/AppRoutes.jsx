import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

/* Pages */
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";

/* Layouts */
import AdminLayout from "../layouts/AdminLayout";
import InternLayout from "../layouts/InternLayout";

/* Admin Pages */
import AdminDashboard from "../admin/AdminDashboard";
import Courses from "../admin/Courses";
import Interns from "../admin/Interns";
import Assignments from "../admin/Assignments";
import Submissions from "../admin/Submissions";
import Certificates from "../admin/Certificates";
import AddIntern from "../admin/components/AddInterns";
import EditIntern from "../admin/components/EditIntern";

/* Intern Pages */
import InternDashboard from "../intern/InternDashboard";
import MyCourses from "../intern/MyCourses";
import MyAssignments from "../intern/MyAssignments";
import Progress from "../intern/Progress";
import Certificate from "../intern/Certificate";

export default function AppRoutes() {
  return (
    <Routes>

      {/* 🌐 PUBLIC */}
      <Route path="/" element={<Login />} />

      {/* 🛡 ADMIN ROUTES (WITH SIDEBAR) */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute role="admin">
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="courses" element={<Courses />} />
        <Route path="interns" element={<Interns />} />
        <Route path="assignments" element={<Assignments />} />
        <Route path="submissions" element={<Submissions />} />
        <Route path="certificates" element={<Certificates />} />
      </Route>

      {/* 🛡 ADD INTERN (NO SIDEBAR / POPUP PAGE) */}
      <Route
        path="/admin/add-intern"
        element={
          <ProtectedRoute role="admin">
            <AddIntern />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/edit-intern/:id"
        element={
          <ProtectedRoute role="admin">
            <EditIntern />
          </ProtectedRoute>
        }
      />

      {/* 🛡 INTERN ROUTES */}
      <Route
        path="/intern"
        element={
          <ProtectedRoute role="intern">
            <InternLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<InternDashboard />} />
        <Route path="courses" element={<MyCourses />} />
        <Route path="assignments" element={<MyAssignments />} />
        <Route path="progress" element={<Progress />} />
        <Route path="certificate" element={<Certificate />} />
      </Route>

      {/* ❌ 404 */}
      <Route path="*" element={<NotFound />} />

    </Routes>
  );
}
