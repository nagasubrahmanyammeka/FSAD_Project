import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const API = "http://localhost:2026/api/admin";

export default function Update() {
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({
    id: null,
    name: "",
    username: "",
    email: "",
    role: "FARMER",
    phone: "",
    location: ""
  });

  const [loading, setLoading] = useState(true);

  // ✅ SAME AS ADMIN EDIT
  useEffect(() => {
    if (location.state) {
      setForm(location.state); // 🔥 EXACT SAME OBJECT
      setLoading(false);
    } else {
      alert("No user data found!");
      navigate("/admin");
    }
  }, [location, navigate]);

  // INPUT
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ SAME UPDATE LOGIC
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`${API}/users/${form.id}`, {
        ...form,
        role: form.role.toUpperCase()
      });

      alert("✅ Updated successfully!");
      navigate("/admin");

    } catch (err) {
      console.error(err);
      alert("❌ Update failed");
    }
  };

  if (loading) return <h2 style={{ textAlign: "center" }}>Loading...</h2>;

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Update User</h2>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input name="name" value={form.name} onChange={handleChange} style={styles.input} placeholder="Name" />
        <input name="username" value={form.username} onChange={handleChange} style={styles.input} placeholder="Username" />
        <input name="email" value={form.email} onChange={handleChange} style={styles.input} placeholder="Email" />
        <input name="phone" value={form.phone} onChange={handleChange} style={styles.input} placeholder="Phone" />
        <input name="location" value={form.location} onChange={handleChange} style={styles.input} placeholder="Location" />

        <select name="role" value={form.role} onChange={handleChange} style={styles.input}>
          <option value="FARMER">Farmer</option>
          <option value="EXPERT">Expert</option>
          <option value="PUBLIC">Public</option>
          <option value="ADMIN">Admin</option>
        </select>

        <button type="submit" style={styles.updateBtn}>Update</button>
        <button type="button" onClick={() => navigate("/admin")} style={styles.cancelBtn}>
          Cancel
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "500px",
    margin: "40px auto",
    padding: "25px",
    borderRadius: "12px",
    boxShadow: "0 2px 12px rgba(0,0,0,0.15)",
    background: "#fff",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#226147",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  updateBtn: {
    background: "#3498db",
    color: "#fff",
    padding: "10px",
    border: "none",
    borderRadius: "6px",
  },
  cancelBtn: {
    background: "#aaa",
    color: "#fff",
    padding: "10px",
    border: "none",
    borderRadius: "6px",
  },
};