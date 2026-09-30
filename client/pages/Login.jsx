import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" }),
    [error, setError] = useState(""),
    [loading, setLoading] = useState(false);
  const { login } = useAuth(),
    nav = useNavigate(),
    location = useLocation();
  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { data } = await api.post("/auth/login", form);
      login(data);
      nav("/dashboard");
    } catch (e) {
      setError(e.response?.data?.message || "Unable to reach the server.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <AuthLayout title="Welcome back" text="Log in to manage your finances.">
      <form onSubmit={submit}>
        {location.state?.message && (
          <div className="alert alert-success">{location.state.message}</div>
        )}
        {error && <div className="alert alert-danger">{error}</div>}
        <Field
          label="Email"
          type="email"
          value={form.email}
          onChange={(email) => setForm({ ...form, email })}
        />
        <Field
          label="Password"
          type="password"
          value={form.password}
          onChange={(password) => setForm({ ...form, password })}
        />
        <button disabled={loading} className="btn btn-dark w-100">
          {loading ? "Logging in..." : "Login"}
        </button>
        <p className="text-center mt-3 mb-0 small">
          New here? <Link to="/register">Create an account</Link>
        </p>
      </form>
    </AuthLayout>
  );
}
export function AuthLayout({ title, text, children }) {
  return (
    <main className="auth-page">
      <div className="auth-card">
        <h2>{title}</h2>
        <p className="text-muted mb-4">{text}</p>
        {children}
      </div>
    </main>
  );
}
export function Field({ label, type, value, onChange }) {
  return (
    <div className="mb-3">
      <label className="form-label">{label}</label>
      <input
        className="form-control"
        type={type}
        required
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
