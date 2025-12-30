import { useState } from "react";
import axios from "axios";
import "./AddIntern.css";

const AddIntern = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:3000/api/admin/addIntern",
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Intern added successfully");
      window.close(); // 🔥 close popup

    } catch (error) {
      alert(error.response?.data?.message || "Error adding intern");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-intern">
      <h2>Add Intern</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Intern Name"
          onChange={handleChange}
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />

        <button disabled={loading}>
          {loading ? "Saving..." : "Add Intern"}
        </button>
      </form>
    </div>
  );
};

export default AddIntern;
