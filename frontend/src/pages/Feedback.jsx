import React, { useState } from 'react';
import { addFeedback } from '../api/api';   // ✅ import API

const Feedback = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const user = JSON.parse(localStorage.getItem("user"));

    const payload = {
      name: formData.name,     // ✅ FIX
      email: formData.email,   // ✅ FIX
      message: formData.message
    };

    console.log("Sending feedback:", payload); // 🔍 DEBUG

    await addFeedback(payload);

    setSuccess('Feedback submitted successfully!');
    setError('');
    setFormData({ name: '', email: '', message: '' });

  } catch (err) {
    setError('Failed to submit feedback');
    setSuccess('');
  }
};

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        padding: '20px',
      }}
    >
      <fieldset
        style={{
          width: '120%',
          maxWidth: '490px',
          padding: '25px',
          borderRadius: '20px',
          background: 'rgba(255, 255, 255, 0.95)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
          border: '2px solid #ddd',
        }}
      >
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>
          Submit Feedback
        </h2>

        {/* ✅ Success Message */}
        {success && (
          <div style={{
            color: '#2e7d32',
            marginBottom: '15px',
            padding: '12px',
            backgroundColor: '#e8f5e9',
            borderRadius: '6px',
            border: '1px solid #4caf50',
          }}>
            {success}
          </div>
        )}

        {/* ❌ Error Message */}
        {error && (
          <div style={{
            color: '#d32f2f',
            marginBottom: '15px',
            padding: '12px',
            backgroundColor: '#ffebee',
            borderRadius: '6px',
            border: '1px solid #f44336',
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '15px' }}>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '10px' }}
            />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '10px' }}
            />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label>Message:</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="5"
              style={{ width: '100%', padding: '10px' }}
            />
          </div>

          <button
            type="submit"
            style={{
              width: '100%',
              padding: '10px',
              backgroundColor: '#2e7d32',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 'bold',
            }}
          >
            Submit Feedback
          </button>
        </form>
      </fieldset>
    </div>
  );
};

export default Feedback;