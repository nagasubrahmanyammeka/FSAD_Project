import React, { useEffect, useState } from "react";
import axios from "axios";

const AllFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const res = await axios.get("http://localhost:2026/api/feedback");
      setFeedbacks(res.data);
    } catch (err) {
      console.error("Error fetching feedbacks:", err);
    }
  };

  return (
    <div style={{ maxWidth: "800px", margin: "40px auto" }}>
      <h2>All Feedbacks</h2>

      {feedbacks.length === 0 ? (
        <p>No feedback found</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {feedbacks.map((f) => (
            <li
              key={f.id}
              style={{
                background: "#f9fafc",
                margin: "10px 0",
                padding: "15px",
                borderRadius: "8px",
                boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
              }}
            >
              <p><strong>Name:</strong> {f.name}</p>
              <p><strong>Email:</strong> {f.email}</p>
              <p><strong>Message:</strong> {f.message}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AllFeedback;