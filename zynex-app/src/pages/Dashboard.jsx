import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { useAuth } from "../AuthContext";
import "./Dashboard.css";

export default function Dashboard() {
  const { user, loading: authLoading, signOut } = useAuth();
  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState(null);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (authLoading) return;

    if (!user) {
      navigate("/auth");
      return;
    }

    supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single()
      .then(({ data, error }) => {
        if (error) setError(error.message);
        else {
          setProfile(data);
          setForm(data);
        }
        setLoading(false);
      });
  }, [user, authLoading, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setSaving(true);
    setError(null);

    const { error: updateError } = await supabase
      .from("profiles")
      .update({
        full_name: form.full_name,
        college_name: form.college_name,
        class: form.class,
        department: form.department,
        mobile_number: form.mobile_number,
      })
      .eq("id", user.id);

    if (updateError) {
      setError(updateError.message);
      setSaving(false);
      return;
    }

    setProfile(form);
    setEditing(false);
    setSaving(false);
  };

  const handleCancel = () => {
    setForm(profile);
    setEditing(false);
  };

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  if (authLoading || loading) {
    return <div className="dashboard dashboard--center">Loading...</div>;
  }

  if (error && !profile) {
    return <div className="dashboard dashboard--center">Error: {error}</div>;
  }

  return (
    <section className="dashboard">
      <div className="dashboard__card">
        <div className="dashboard__header">
          <div className="dashboard__avatar">
            {profile?.full_name?.split(" ").map((w) => w[0]).slice(0, 2).join("")}
          </div>
          <div>
            <h2>{profile?.full_name}</h2>
            <p className="dashboard__email">{profile?.email}</p>
          </div>
        </div>

        {!editing ? (
          <>
            <div className="dashboard__grid">
              <div className="dashboard__field">
                <span className="dashboard__label">College</span>
                <span className="dashboard__value">{profile?.college_name || "—"}</span>
              </div>
              <div className="dashboard__field">
                <span className="dashboard__label">Class</span>
                <span className="dashboard__value">{profile?.class || "—"}</span>
              </div>
              <div className="dashboard__field">
                <span className="dashboard__label">Department</span>
                <span className="dashboard__value">{profile?.department || "—"}</span>
              </div>
              <div className="dashboard__field">
                <span className="dashboard__label">Mobile Number</span>
                <span className="dashboard__value">{profile?.mobile_number || "—"}</span>
              </div>
            </div>

            <button className="dashboard__edit" onClick={() => setEditing(true)}>
              Edit Profile
            </button>
            <button className="dashboard__logout" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <div className="dashboard__edit-grid">
              <div className="dashboard__edit-field">
                <label>Full Name</label>
                <input name="full_name" value={form.full_name || ""} onChange={handleChange} />
              </div>
              <div className="dashboard__edit-field">
                <label>College</label>
                <input name="college_name" value={form.college_name || ""} onChange={handleChange} />
              </div>
              <div className="dashboard__edit-field">
                <label>Class</label>
                <input name="class" value={form.class || ""} onChange={handleChange} />
              </div>
              <div className="dashboard__edit-field">
                <label>Department</label>
                <input name="department" value={form.department || ""} onChange={handleChange} />
              </div>
              <div className="dashboard__edit-field">
                <label>Mobile Number</label>
                <input name="mobile_number" value={form.mobile_number || ""} onChange={handleChange} />
              </div>
            </div>

            {error && <p className="dashboard__error">{error}</p>}

            <div className="dashboard__edit-actions">
              <button className="dashboard__save" onClick={handleSave} disabled={saving}>
                {saving ? "Saving..." : "Save Changes"}
              </button>
              <button className="dashboard__cancel" onClick={handleCancel} disabled={saving}>
                Cancel
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}