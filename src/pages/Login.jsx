
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, LockKeyhole, Mail, UserRound } from "lucide-react";
import AuthLayout from "../components/AuthLayout";

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    // Demo only. Replace with a real backend login request.
    navigate("/dashboard");
  }

  return (
    <AuthLayout
      title="Welcome Back!"
      description="Log in to your account to continue chatting with your friends and team."
    >
      <div className="auth-form-content">
        <h1>Login</h1>
        <p className="auth-subtitle">
          Don't have an account? <Link to="/register">Register</Link>
        </p>

        <form onSubmit={handleSubmit}>
          <label className="auth-input">
            <UserRound size={18} />
            <input
              type="email"
              placeholder="Email address"
              aria-label="Email address"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>

          <label className="auth-input">
            <LockKeyhole size={18} />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              aria-label="Password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword((value) => !value)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </label>

          <div className="auth-options">
            <label className="remember-option">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
              />
              Remember me
            </label>
            <Link to="/login" onClick={(e) => {
              e.preventDefault();
              alert("Connect a password-reset flow to enable this feature.");
            }}>
              Forgot password?
            </Link>
          </div>

          <button className="auth-submit" type="submit">
            Login
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
