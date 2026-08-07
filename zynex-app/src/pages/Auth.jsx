import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import "./Auth.css";

export default function Auth() {
  const [mode, setMode] = useState("signup"); // "signup" | "login"
  const [form, setForm] = useState({
    full_name: "",
    college_name: "",
    class: "",
    department: "",
    email: "",
    mobile_number: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setStatus(null);

    const { data, error: signUpError } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        data: {
          full_name: form.full_name,
        },
      },
    });

    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
      return;
    }

    setLoading(false);

    if (data.session) {
      navigate("/dashboard");
    } else {
      setStatus("Check your email to confirm your account before logging in.");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setStatus(null);

    const { error: loginError } = await supabase.auth.signInWithPassword({
      email: form.email,
      password: form.password,
    });

    if (loginError) {
      setError(loginError.message);
      setLoading(false);
      return;
    }

    setLoading(false);
    navigate("/dashboard");
  };

  return (
    <section className="auth">
      <div className="auth__card">
        <h2 className="auth__title">{mode === "signup" ? "Create Account" : "Welcome Back"}</h2>

        <div className="auth__toggle">
          <button
            className={mode === "signup" ? "auth__toggle-btn active" : "auth__toggle-btn"}
            onClick={() => setMode("signup")}
          >
            Sign Up
          </button>
          <button
            className={mode === "login" ? "auth__toggle-btn active" : "auth__toggle-btn"}
            onClick={() => setMode("login")}
          >
            Login
          </button>
        </div>

        <form onSubmit={mode === "signup" ? handleSignup : handleLogin} className="auth__form">
          {mode === "signup" && (
            <>
              <div className="auth__field">
                <label>FULL NAME</label>
                <input name="full_name" value={form.full_name} onChange={handleChange} required />
              </div>
              <div className="auth__field">
                <label>COLLEGE NAME</label>
                <input name="college_name" value={form.college_name} onChange={handleChange} />
              </div>
              <div className="auth__form-row">
                <div className="auth__field">
                  <label>CLASS</label>
                  <input name="class" value={form.class} onChange={handleChange} />
                </div>
                <div className="auth__field">
                  <label>DEPARTMENT</label>
                  <input name="department" value={form.department} onChange={handleChange} />
                </div>
              </div>
              <div className="auth__field">
                <label>MOBILE NUMBER</label>
                <input name="mobile_number" value={form.mobile_number} onChange={handleChange} />
              </div>
            </>
          )}

          <div className="auth__field">
            <label>EMAIL ADDRESS</label>
            <input name="email" type="email" value={form.email} onChange={handleChange} required />
          </div>
          <div className="auth__field">
            <label>PASSWORD</label>
            <input name="password" type="password" value={form.password} onChange={handleChange} required minLength={6} />
          </div>

          {error && <p className="auth__error">{error}</p>}
          {status && <p className="auth__success">{status}</p>}

          <button type="submit" className="auth__submit" disabled={loading}>
            {loading ? "Please wait..." : mode === "signup" ? "Create Account" : "Login"}
          </button>
        </form>
      </div>
    </section>
  );
}