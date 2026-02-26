import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalUsers: 0,
    farmers: 0,
    experts: 0,
    publicUsers: 0
  });

  const [users, setUsers] = useState([]);
  const [deletingUserId, setDeletingUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchStatsAndUsers();
  }, []);

  const fetchStatsAndUsers = async () => {
    try {
      const statsRes = await axios.get("http://localhost:5000/api/admin/stats");
      setStats(statsRes.data);

      const usersRes = await axios.get("http://localhost:5000/api/admin/users");
      setUsers(usersRes.data);
    } catch (err) {
      console.error("Backend not available. Loading demo users.");

      const demoUsers = [
        {
          _id: "1",
          name: "Ramesh",
          username: "ramesh123",
          email: "ramesh@gmail.com",
          role: "farmer",
          phone: "9876543210",
          location: "Hyderabad"
        },
        {
          _id: "2",
          name: "Sita",
          username: "sita456",
          email: "sita@gmail.com",
          role: "expert",
          phone: "9123456780",
          location: "Chennai"
        },
        {
          _id: "3",
          name: "Arjun",
          username: "arjun789",
          email: "arjun@gmail.com",
          role: "public",
          phone: "9012345678",
          location: "Mumbai"
        }
      ];

      setUsers(demoUsers);

      setStats({
        totalUsers: demoUsers.length,
        farmers: demoUsers.filter(u => u.role === "farmer").length,
        experts: demoUsers.filter(u => u.role === "expert").length,
        publicUsers: demoUsers.filter(u => u.role === "public").length
      });

      setError("Backend not running. Showing demo data.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Add User Navigation
  const handleAddUser = () => {
    navigate("/register");
  };

  // ✅ Update User Navigation
  const handleUpdateUser = (userId) => {
    navigate("/profile/update");
  };

  // ✅ Delete User
  const handleDelete = async (userId) => {
    const userToDelete = users.find(u => u._id === userId);

    if (!window.confirm(
      `Are you sure you want to delete "${userToDelete?.name}"?\n\nThis action cannot be undone.`
    )) {
      return;
    }

    setDeletingUserId(userId);

    try {
      await axios.delete(`http://localhost:5000/api/admin/users/${userId}`);

      const updatedUsers = users.filter(user => user._id !== userId);
      setUsers(updatedUsers);

      const deletedUser = users.find(u => u._id === userId);

      if (deletedUser) {
        setStats(prev => ({
          totalUsers: prev.totalUsers - 1,
          farmers: deletedUser.role === "farmer" ? prev.farmers - 1 : prev.farmers,
          experts: deletedUser.role === "expert" ? prev.experts - 1 : prev.experts,
          publicUsers: deletedUser.role === "public" ? prev.publicUsers - 1 : prev.publicUsers
        }));
      }

      alert("User deleted successfully!");
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete user!");
    } finally {
      setDeletingUserId(null);
    }
  };

  if (loading) {
    return (
      <div className="dashboard-bg">
        <div className="dashboard-card" style={{ textAlign: "center", padding: "60px" }}>
          <h2>Loading dashboard...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-bg">
      <div className="dashboard-card">
        <h1>Admin Dashboard</h1>
        <p style={{ color: "#d2ffd2", marginBottom: "30px" }}>
          User Statistics Overview
        </p>

        {error && (
          <div style={{ color: "yellow", marginBottom: "20px" }}>
            ⚠ {error}
          </div>
        )}

        {/* ✅ Stats Section */}
        <div className="stats-grid" style={{ marginBottom: "30px" }}>
          <div className="stat-card">
            <h3>Total Users</h3>
            <div>{stats.totalUsers}</div>
          </div>
          <div className="stat-card">
            <h3>Farmers</h3>
            <div>{stats.farmers}</div>
          </div>
          <div className="stat-card">
            <h3>Experts</h3>
            <div>{stats.experts}</div>
          </div>
          <div className="stat-card">
            <h3>Public Users</h3>
            <div>{stats.publicUsers}</div>
          </div>
        </div>

        {/* ✅ Add User Button (Top) */}
        <div style={{ marginBottom: "20px", textAlign: "right" }}>
          <button
            onClick={handleAddUser}
            style={{
              background: "#2ecc71",
              color: "#fff",
              padding: "8px 16px",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer"
            }}
          >
            + Add User
          </button>
        </div>

        {/* ✅ Users Table */}
        <div className="table-container">
          <table className="users-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Username</th>
                <th>Email</th>
                <th>Role</th>
                <th>Phone</th>
                <th>Location</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan="7" style={{ textAlign: "center" }}>
                    No users found.
                  </td>
                </tr>
              ) : (
                users.map(user => (
                  <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>{user.phone}</td>
                    <td>{user.location}</td>
                    <td>
                      <div style={{ display: "flex", gap: "6px" }}>
                        {/* Update */}
                        <button
                          style={{
                            background: "#3498db",
                            color: "#fff",
                            border: "none",
                            padding: "4px 10px",
                            borderRadius: "4px",
                            cursor: "pointer"
                          }}
                          onClick={() => handleUpdateUser(user._id)}
                        >
                          Update
                        </button>

                        {/* Delete */}
                        <button
                          style={{
                            background: "#cf2323",
                            color: "#fff",
                            border: "none",
                            padding: "4px 10px",
                            borderRadius: "4px",
                            cursor: deletingUserId === user._id ? "not-allowed" : "pointer",
                            opacity: deletingUserId === user._id ? 0.6 : 1
                          }}
                          onClick={() => handleDelete(user._id)}
                          disabled={deletingUserId === user._id}
                        >
                          {deletingUserId === user._id ? "..." : "Delete"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Feedback Navigation */}
        <div style={{ marginTop: "30px" }}>
          Click To See All Feedback Provided by the Users - 
          <button
            onClick={() => navigate("/all-feedbacks")}
            style={{
              background: "#2b9c59",
              color: "#fff",
              padding: "8px 16px",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer"
            }}
          >
             See All Feedbacks
          </button>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;