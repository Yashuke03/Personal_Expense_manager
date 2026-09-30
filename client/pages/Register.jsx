import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import { AuthLayout, Field } from "./Login";

export default function Register() {
  const [form, setForm] = useState({
      name: "",
      email: "",
      password: "",
      confirm: "",
    }),
    [error, setError] = useState(""),
    [loading, setLoading] = useState(false),
    nav = useNavigate();
  const submit = async (e) => {
    e.preventDefault();
    setError("");
    if (form.password.length < 6)
      return setError("Password must be at least 6 characters.");
    if (form.password !== form.confirm)
      return setError("Passwords do not match.");
    setLoading(true);
    try {
      await api.post("/auth/register", form);
      nav("/login", { state: { message: "Account created. Please log in." } });
    } catch (e) {
      setError(e.response?.data?.message || "Unable to reach the server.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <AuthLayout
      title="Create your account"
      text="Start making smarter money decisions today."
    >
      <form onSubmit={submit}>
        {error && <div className="alert alert-danger">{error}</div>}
        <Field
          label="Name"
          type="text"
          value={form.name}
          onChange={(name) => setForm({ ...form, name })}
        />
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
        <Field
          label="Confirm Password"
          type="password"
          value={form.confirm}
          onChange={(confirm) => setForm({ ...form, confirm })}
        />
        <button disabled={loading} className="btn btn-dark w-100">
          {loading ? "Creating account..." : "Create account"}
        </button>
        <p className="text-center mt-3 mb-0 small">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </AuthLayout>
  );
}
