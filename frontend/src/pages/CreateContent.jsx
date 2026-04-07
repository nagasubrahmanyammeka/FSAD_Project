import React, { useState } from "react";
import axios from "axios";

export default function CreateContent() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    title: "",
    description: "",
    file: null,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    if (e.target.name === "file") {
      setForm({ ...form, file: e.target.files[0] });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.file) {
      alert("Please select a file");
      return;
    }

    try {
      setLoading(true);

      const data = new FormData();
      data.append("name", form.name);
      data.append("email", form.email);
      data.append("title", form.title);
      data.append("description", form.description);
      data.append("file", form.file);

      const res = await axios.post(
        "http://localhost:2026/api/content/upload",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Uploaded:", res.data);
      alert("✅ Content uploaded successfully!");

      // Reset form
      setForm({
        name: "",
        email: "",
        title: "",
        description: "",
        file: null,
      });

    } catch (err) {
      console.error(err);
      alert("❌ Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Create Content</h2>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          name="name"
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
          style={styles.input}
          required
        />

        <input
          name="email"
          placeholder="Your Email"
          value={form.email}
          onChange={handleChange}
          style={styles.input}
          required
        />

        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          style={styles.input}
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          style={styles.input}
          required
        />

        <input
          type="file"
          name="file"
          onChange={handleChange}
          style={styles.input}
          required
        />

        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? "Uploading..." : "Upload Content"}
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
    background: "#fff",
    borderRadius: "10px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
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
  button: {
    padding: "12px",
    background: "#27a844",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
  },
};