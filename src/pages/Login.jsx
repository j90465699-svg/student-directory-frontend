
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(email, password);
      navigate("/students");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="login-page">
      <section className="login-showcase">
        <div className="showcase-content">
          <div className="brand">
            <div className="brand-icon">SD</div>
            <span>STUDENT DIRECTORY</span>
          </div>

          <div className="showcase-message">
            <span className="eyebrow">STUDENT MANAGEMENT SYSTEM</span>
            <h1>
              Your academic
              <br />
              journey starts <span>here.</span>
            </h1>
            <p>
              Access your student directory through one
              secure and organized platform.
            </p>
          </div>

          <div className="showcase-decoration">
            <div className="decoration-card decoration-one">
              <span className="decoration-icon">✦</span>
              <div>
                <strong>Student Records</strong>
                <small>Organized and accessible</small>
              </div>
            </div>

            <div className="decoration-card decoration-two">
              <span className="decoration-icon">✓</span>
              <div>
                <strong>Secure Access</strong>
                <small>Protected account access</small>
              </div>
            </div>
          </div>

          <p className="showcase-footer">
            STUDENT DIRECTORY SYSTEM · 2026
          </p>
        </div>
      </section>

      <section className="login-form-section">
        <div className="login-form-wrapper">
          <div className="mobile-brand">
            <div className="brand-icon">SD</div>
            <span>STUDENT DIRECTORY</span>
          </div>

          <div className="login-heading">
            <span className="form-eyebrow">WELCOME BACK</span>
            <h2>Sign in to your account</h2>
            <p>
              Enter your credentials to access your student dashboard.
            </p>
          </div>

          {error && (
            <div className="error-message" role="alert">
              <span>!</span>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="modern-login-form">
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
              />
            </div>

            <div className="form-group">
              <div className="password-label">
                <label htmlFor="password">Password</label>
              </div>

              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
              />
            </div>

            <button type="submit" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
              {!loading && <span>→</span>}
            </button>
          </form>

          <div className="login-divider">
            <span>NEW TO STUDENT DIRECTORY?</span>
          </div>

          <p className="login-register">
            Don't have an account?
            <Link to="/register"> Create an account</Link>
          </p>

          <p className="login-privacy">
            Secure student directory access
          </p>
        </div>
      </section>
    </main>
  );
}

export default Login;
