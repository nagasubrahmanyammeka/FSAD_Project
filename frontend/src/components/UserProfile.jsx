import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const defaultAvatar =
  "https://cdn-icons-png.flaticon.com/512/1946/1946429.png";

export default function UserProfile() {
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();

  const [details, setDetails] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // =========================
  // LOAD USER
  // =========================
  useEffect(() => {
    if (loading) return;

    if (!user) {
      navigate("/login");
      return;
    }

    setDetails(user);
  }, [user, loading, navigate]);

  // =========================
  // DELETE ACCOUNT
  // =========================
  const handleDeleteAccount = async () => {
    if (!details?.id) return;

    if (
      !window.confirm(
        `⚠️ Delete account?\n\nName: ${details.name}\nEmail: ${details.email}\nRole: ${details.role}`
      )
    )
      return;

    setDeleting(true);

    try {
      await fetch(`http://localhost:2026/api/admin/users/${details.id}`, {
        method: "DELETE",
      });

      alert("✅ Account deleted successfully");
      logout();
      navigate("/register");
    } catch (err) {
      console.error(err);
      alert("❌ Delete failed");
    } finally {
      setDeleting(false);
    }
  };

  // =========================
  // DASHBOARD NAVIGATION
  // =========================
  const handleDashboard = () => {
    switch (details.role) {
      case "ADMIN":
        navigate("/admin");
        break;
      case "FARMER":
        navigate("/farmer");
        break;
      case "EXPERT":
        navigate("/expert");
        break;
      case "PUBLIC":
        navigate("/public");
        break;
      default:
        navigate("/");
    }
  };

  if (loading || !details) {
    return <div style={styles.loading}>Loading profile...</div>;
  }

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.card}>
        <div style={styles.profileHeading}>Profile</div>

        {/* Avatar */}
        <div style={{ textAlign: "center", margin: "26px 0 18px 0" }}>
          <img src={defaultAvatar} alt="avatar" style={styles.avatar} />
          <div style={styles.name}>{details.name}</div>
          <div style={styles.role}>{details.role}</div>
        </div>

        {/* Details */}
        <div style={styles.fieldGroup}>
          <div style={styles.inputRow}>
            <label style={styles.inputLabel}>Full Name</label>
            <input disabled style={styles.input} value={details.name} />
          </div>

          <div style={styles.inputRow}>
            <label style={styles.inputLabel}>Email</label>
            <input disabled style={styles.input} value={details.email} />
          </div>

          <div style={styles.inputRow}>
            <label style={styles.inputLabel}>Phone</label>
            <input disabled style={styles.input} value={details.phone || ""} />
          </div>

          <div style={styles.inputRow}>
            <label style={styles.inputLabel}>Location</label>
            <input disabled style={styles.input} value={details.location || ""} />
          </div>

          <div style={styles.inputRow}>
            <label style={styles.inputLabel}>Role</label>
            <input disabled style={styles.input} value={details.role} />
          </div>
        </div>

        {/* UPDATE */}
        <button
          onClick={() => navigate("/profile/update")}
          style={styles.updateBtn}
        >
          Update Profile
        </button>

        {/* DELETE */}
        <button
          onClick={handleDeleteAccount}
          disabled={deleting}
          style={{
            ...styles.deleteBtn,
            opacity: deleting ? 0.6 : 1,
          }}
        >
          {deleting ? "Deleting..." : "Delete Account"}
        </button>

        {/* DASHBOARD */}
        <button style={styles.dashboardBtn} onClick={handleDashboard}>
          Go To Dashboard
        </button>
      </div>
    </div>
  );
}

//
// =========================
// STYLES (YOUR ORIGINAL)
// =========================
//
const styles = {
  pageWrapper: {
    minHeight: "calc(100vh - 80px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "24px",
  },
  card: {
    background: "#fff",
    borderRadius: "16px",
    width: "800px",
    maxWidth: "100%",
    boxShadow: "0 2px 14px rgba(0,0,0,0.08)",
    padding: "32px",
    display: "flex",
    flexDirection: "column",
  },
  profileHeading: {
    fontWeight: "bold",
    fontSize: "1.45rem",
    color: "#153518",
    marginBottom: "7px",
  },
  avatar: {
    width: "80px",
    height: "80px",
    borderRadius: "50%",
  },
  name: {
    fontSize: "1.13rem",
    fontWeight: "bold",
    color: "#226147",
    marginTop: "8px",
  },
  role: {
    color: "#8da886",
    fontSize: "1.04rem",
  },
  fieldGroup: {
    marginTop: "4px",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  inputRow: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
  },
  inputLabel: {
    width: "120px",
    fontWeight: "500",
  },
  input: {
    flex: 1,
    padding: "10px",
    borderRadius: "7px",
    border: "1px solid #ddd",
    background: "#f6f6f6",
  },
  updateBtn: {
    marginTop: "20px",
    padding: "12px",
    background: "#16794C",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
  deleteBtn: {
    marginTop: "12px",
    padding: "12px",
    background: "#cf2323",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
  dashboardBtn: {
    marginTop: "18px",
    padding: "12px",
    background: "#27a844",
    color: "#fff",
    fontWeight: "bold",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
  loading: {
    textAlign: "center",
    padding: "40px",
  },
};