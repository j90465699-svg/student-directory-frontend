
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:3000/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Registration failed");
      }

      setSuccess("Registration successful! Redirecting to login...");

      setTimeout(() => {
        navigate("/login");
      }, 1500);
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
              Start your
              <br />
              journey <span>today.</span>
            </h1>
            <p>
              Create your account and access a secure
              and organized student directory platform.
            </p>
          </div>

          <div className="showcase-decoration">
            <div className="decoration-card decoration-one">
              <span className="decoration-icon">✦</span>
              <div>
                <strong>Easy Registration</strong>
                <small>Create your account easily</small>
              </div>
            </div>

            <div className="decoration-card decoration-two">
              <span className="decoration-icon">✓</span>
              <div>
                <strong>Secure Access</strong>
                <small>Your account is protected</small>
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
            <span className="form-eyebrow">GET STARTED</span>
            <h2>Create your account</h2>
            <p>
              Fill in your details to join the Student Directory.
            </p>
          </div>

          {error && (
            <div className="error-message" role="alert">
              <span>!</span>
              {error}
            </div>
          )}

          {success && (
            <div className="success-message" role="status">
              {success}
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
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="At least 8 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
                minLength={8}
                required
              />
            </div>

            <button type="submit" disabled={loading}>
              {loading ? "Creating account..." : "Create Account"}
              {!loading && <span>→</span>}
            </button>
          </form>

          <div className="login-divider">
            <span>ALREADY REGISTERED?</span>
          </div>

          <p className="login-register">
            Already have an account?
            <Link to="/login"> Sign in</Link>
          </p>

          <p className="login-privacy">
            Secure student directory access
          </p>
        </div>
      </section>
    </main>
  );
}

export default Register;
