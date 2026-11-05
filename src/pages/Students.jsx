
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function Students() {
  const { token, user, logout } = useAuth();
  const navigate = useNavigate();

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/students",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to load students");
        }

        setStudents(Array.isArray(data) ? data : data.students || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchStudents();
    } else {
      setLoading(false);
    }
  }, [token]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="students-container">
      <header className="students-header">
        <div className="dashboard-brand">
          <div className="brand-icon">SD</div>
          <div>
            <h1>Student Directory</h1>
            <p>Student Management System</p>
          </div>
        </div>

        <div className="dashboard-user">
          <div className="user-info">
            <span>Signed in as</span>
            <strong>{user?.email}</strong>
          </div>

          <button onClick={handleLogout} className="logout-button">
            Logout <span>→</span>
          </button>
        </div>
      </header>

      <main className="students-content">
        <div className="dashboard-welcome">
          <span className="form-eyebrow">DASHBOARD OVERVIEW</span>
          <h2>Welcome to your dashboard.</h2>
          <p>
            View and access the available student records
            in your directory.
          </p>
        </div>

        <div className="students-section">
          <div className="students-section-heading">
            <div>
              <h2>Students List</h2>
              <p>Available student records</p>
            </div>

            {!loading && !error && (
              <span className="student-count">
                {students.length} {students.length === 1 ? "Student" : "Students"}
              </span>
            )}
          </div>

          {loading && (
            <div className="dashboard-message">
              Loading students...
            </div>
          )}

          {error && (
            <div className="dashboard-message dashboard-error">
              {error}
            </div>
          )}

          {!loading && !error && students.length === 0 && (
            <div className="dashboard-message">
              No students found.
            </div>
          )}

          {!loading && !error && students.length > 0 && (
            <div className="students-grid">
              {students.map((student) => (
                <div className="student-card" key={student._id}>
                  <div className="student-avatar">
                    {(student.name || student.fullName || "S")
                      .charAt(0)
                      .toUpperCase()}
                  </div>

                  <div className="student-details">
                    <h3>{student.name || student.fullName || "No name"}</h3>
                    <p>{student.email || "No email"}</p>
                  </div>

                  <span className="student-status">Registered</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <footer className="dashboard-footer">
          Student Directory System · 2026
        </footer>
      </main>
    </div>
  );
}

export default Students;
