
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, LockKeyhole, Mail, UserRound } from "lucide-react";
import AuthLayout from "../components/AuthLayout";

export default function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  function update(field, value) {
    setForm((previous) => ({ ...previous, [field]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (form.password.length < 8) {
      setError("Password must contain at least 8 characters.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setError("");

    // Demo only. Send the data to POST /api/auth/register in production.
    navigate("/login");
  }

  return (
    <AuthLayout
      title="Join ChatConnect"
      description="Create your account and be part of a growing community."
    >
      <div className="auth-form-content register-content">
        <h1>Create Your Account</h1>
        <p className="auth-subtitle">
          Already have an account? <Link to="/login">Login</Link>
        </p>

        <form onSubmit={handleSubmit}>
          <label className="auth-input">
            <UserRound size={18} />
            <input
              placeholder="Full Name"
              autoComplete="name"
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              required
            />
          </label>

          <label className="auth-input">
            <Mail size={18} />
            <input
              type="email"
              placeholder="Email address"
              autoComplete="email"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              required
            />
          </label>

          <label className="auth-input">
            <UserRound size={18} />
            <input
              placeholder="Username"
              autoComplete="username"
              value={form.username}
              onChange={(e) => update("username", e.target.value)}
              required
            />
          </label>

          <label className="auth-input">
            <LockKeyhole size={18} />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              autoComplete="new-password"
              minLength={8}
              value={form.password}
              onChange={(e) => update("password", e.target.value)}
              required
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword((value) => !value)}
              aria-label="Toggle password visibility"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </label>

          <label className="auth-input">
            <LockKeyhole size={18} />
            <input
              type={showConfirm ? "text" : "password"}
              placeholder="Confirm Password"
              autoComplete="new-password"
              value={form.confirmPassword}
              onChange={(e) => update("confirmPassword", e.target.value)}
              required
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowConfirm((value) => !value)}
              aria-label="Toggle confirmation visibility"
            >
              {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </label>

          {error && <p className="form-error">{error}</p>}

          <button className="auth-submit" type="submit">
            Register
          </button>
        </form>

        <div className="auth-divider"><span>or</span></div>

        <button
          type="button"
          className="social-button"
          onClick={() => alert("Google sign-in requires OAuth setup.")}
        >
          <span className="google-mark">G</span>
          Continue with Google
        </button>

        <button
          type="button"
          className="social-button"
          onClick={() => alert("Facebook sign-in requires OAuth setup.")}
        >
          <span className="facebook-mark">f</span>
          Continue with Facebook
        </button>
      </div>
    </AuthLayout>
  );
}
