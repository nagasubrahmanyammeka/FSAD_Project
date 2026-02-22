import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Update() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    location: ""
  });

  const [loading, setLoading] = useState(true);

  // Load current user details
  useEffect(() => {
    const loadUser = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch("http://localhost:5000/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();

        setForm({
          name: data.user.name || "",
          phone: data.user.phone || "",
          location: data.user.location || "",
        });
      } catch (err) {
        console.error("Failed to load user:", err);
      }
      setLoading(false);
    };

    loadUser();
  }, []);

  // Handle input typing
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Submit update request
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:5000/api/users/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Update failed!");
        return;
      }

      alert("Profile updated successfully!");
      navigate("/profile");

    } catch (err) {
      alert("Error updating profile: " + err.message);
    }
  };

  if (loading) return <h2 style={{ textAlign: "center" }}>Loading...</h2>;

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Update Profile</h2>

      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.label}>Full Name</label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          style={styles.input}
          required
        />

        <label style={styles.label}>Phone</label>
        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          style={styles.input}
          required
        />

        <label style={styles.label}>Location</label>
        <input
          name="location"
          value={form.location}
          onChange={handleChange}
          style={styles.input}
          required
        />

        <button type="submit" style={styles.updateBtn}>
          Save Changes
        </button>

        <button
          type="button"
          onClick={() => navigate("/profile")}
          style={styles.cancelBtn}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "450px",
    margin: "40px auto",
    padding: "25px",
    borderRadius: "12px",
    boxShadow: "0 2px 12px rgba(0,0,0,0.15)",
    background: "#fff",
  },
  title: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: "20px",
    color: "#226147",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  label: {
    fontWeight: "500",
    color: "#153518",
  },
  input: {
    padding: "10px",
    fontSize: "1rem",
    borderRadius: "6px",
    border: "1px solid #ccc",
    background: "#f8f8f8",
  },
  updateBtn: {
    padding: "12px",
    background: "#27a844",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "bold",
  },
  cancelBtn: {
    padding: "10px",
    background: "#aaa",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    marginTop: "5px",
  },
};
