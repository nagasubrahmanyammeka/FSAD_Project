import React, { useEffect, useState } from "react";
import axios from "axios";

function AllGuidance() {
  const [feedbacks, setGuidance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:2026/api/guidance") // ✅ FIXED PORT
      .then((res) => {
        console.log("Guidance from backend:", res.data); // DEBUG
        setGuidance(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching guidance:", err);
        setError("❌ Failed to load guidance  from backend");
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading guidances...</div>;

  return (
    <div style={{ maxWidth: 600, margin: "40px auto", padding: 20 }}>
      <h2>All Guidance</h2>

      {error && (
        <p style={{ color: "red", marginBottom: 10 }}>
          {error}
        </p>
      )}

      {feedbacks.length === 0 ? (
        <p>No guidances found!</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {feedbacks.map((fb) => (
            <li
              key={fb.id} // ✅ FIXED (Spring uses id, not _id)
              style={{
                background: "#f4f6fa",
                margin: "10px 0",
                borderRadius: 8,
                padding: "16px",
                boxShadow: "0 2px 7px rgba(0,0,0,0.06)",
              }}
            >
              <span><strong>Name:</strong> {fb.name}</span> <br />
              <span><strong>Email:</strong> {fb.email}</span> <br />
              <span><strong>Message:</strong> {fb.message}</span>
              <br/>
              <br/>
              <p>Contact By: {fb.email}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AllGuidance;