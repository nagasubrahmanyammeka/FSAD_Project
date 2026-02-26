import React, { useState } from "react";

const AllGuidance = () => {

  // 🔹 Static Guidance Data (No Backend)
  const [guidance] = useState([
    {
      _id: 1,
      name: "Dr. Ramesh",
      email: "ramesh@agri.com",
      message: "Use drip irrigation to save water and improve crop yield."
    },
    {
      _id: 2,
      name: "Dr. Priya",
      email: "priya@agri.com",
      message: "Apply organic compost to improve soil fertility."
    },
    {
      _id: 3,
      name: "Dr. Kumar",
      email: "kumar@agri.com",
      message: "Monitor pest attacks regularly and use bio-pesticides."
    }
  ]);

  return (
    <div style={{ maxWidth: 700, margin: "40px auto", padding: 20 }}>
      <h2>All Guidance Provided by Experts</h2>

      {guidance.length === 0 && <p>No Guidance found!</p>}

      <ul style={{ listStyle: "none", padding: 0 }}>
        {guidance.map((item) => (
          <li
            key={item._id}
            style={{
              background: "#f9fafc",
              margin: "10px 0",
              borderRadius: 8,
              padding: "16px",
              boxShadow: "0 2px 7px rgba(0,0,0,0.06)",
            }}
          >
            <p>
              <strong>Name:</strong> {item.name}
            </p>
            <p>
              <strong>Email:</strong> {item.email}
            </p>
            <p>
              <strong>Message:</strong> {item.message}
            </p>
            <br />
            <p>Contact By: {item.email}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllGuidance;