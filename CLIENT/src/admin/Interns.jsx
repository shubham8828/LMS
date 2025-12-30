import { useEffect, useState } from "react";
import axios from "axios";
import "./Interns.css";

const Interns = () => {
  const [interns, setInterns] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInterns();
  }, []);

  const fetchInterns = async () => {
    try {
      setLoading(true);

      // 🔐 Get token from localStorage
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:3000/api/admin/getInterns",
        {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ send token
          },
        }
      );

      setInterns(res.data.interns);

    } catch (error) {
      console.error("Error fetching interns:", error.response || error);
    } finally {
      setLoading(false);
    }
  };

  // 🔍 Search logic
  const filteredInterns = interns.filter((intern) =>
    intern._id.toLowerCase().includes(search.toLocaleUpperCase()) ||
    intern.name.toLowerCase().includes(search.toUpperCase()) ||
    intern.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (id) => {
  const confirmDelete = window.confirm("Delete this intern?");
  if (!confirmDelete) return;

  try {
    const token = localStorage.getItem("token");

    await axios.delete(
      `http://localhost:3000/api/admin/interns/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("Intern deleted successfully");

    // 🔄 Refresh intern list
    fetchInterns();

  } catch (error) {
    console.error("Delete error:", error);
    alert(error.response?.data?.message || "Failed to delete intern");
  }
};



const handleAddIntern = () => {
  const popup = window.open(
    `${window.location.origin}/admin/add-intern`,
    "AddInternWindow",
    "width=600,height=550,left=400,top=100"
  );

  const timer = setInterval(() => {
    if (popup && popup.closed) {
      clearInterval(timer);
      fetchInterns();
    }
  }, 500);
};


const handleEdit = (id) => () => {
  const popup = window.open(
    `${window.location.origin}/admin/edit-intern/${id}`,
    "EditInternWindow",
    "width=600,height=550,left=400,top=100"
  );  

  const timer = setInterval(() => {
    if (popup && popup.closed) {
      clearInterval(timer);
      fetchInterns();
    }   
  }, 500);
};


  return (
    <div className="interns-page">
      
      {/* Header */}
      <div className="interns-header">
        <h2>Intern Management</h2>
        <button className="add-btn" onClick={handleAddIntern}>
          + Add Intern
        </button>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search by ID, name or email..."
        className="search-input"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Table */}
      {loading ? (
        <p>Loading interns...</p>
      ) : (
        <table className="interns-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Intern ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Courses</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredInterns.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ textAlign: "center" }}>
                  No interns found
                </td>
              </tr>
            ) : (
              filteredInterns.map((intern, index) => (
                <tr key={intern._id}>
                  <td>{index + 1}</td>
                  <td>{intern.internId}</td>
                  <td>{intern.name}</td>
                  <td>{intern.email}</td>
                  <td>
                    <span className="badge">Not Assigned</span>
                  </td>
                  <td className="actions">
                    <button className="edit-btn" onClick={handleEdit(intern._id)}>Edit</button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(intern._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Interns;
