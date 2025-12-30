import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./EditIntern.css";

const EditIntern = () => {
  const { id } = useParams();
  const [form, setForm] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchIntern();
  }, []);

  const fetchIntern = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        `http://localhost:3000/api/admin/intern/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setForm({
        name: res.data.name,
        email: res.data.email
      });

    } catch (error) {
      alert("Failed to load intern",error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `http://localhost:3000/api/admin/intern/${id}`,
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Intern updated successfully");
      window.close();

    } catch (error) {
      alert(error.response?.data?.message || "Update failed");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="edit-intern">
      <h2>Edit Intern</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          required
        />

        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />

        <button>Update</button>
      </form>
    </div>
  );
};

export default EditIntern;
