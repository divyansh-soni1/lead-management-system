import { useState } from "react";
import { addLead } from "../api";

export default function LeadForm({ refresh }) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    source: "Call",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setError("");

    if (!form.name || form.name.trim().length < 2) {
      setError("Name must be at least 2 characters");
      return;
    }

    if (!/^[0-9]{10}$/.test(form.phone)) {
      setError("Phone must be 10 digits");
      return;
    }

    try {
      setLoading(true);
      await addLead(form);
      setForm({ name: "", phone: "", source: "Call" });
      refresh();
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <input
        placeholder="Name"
        value={form.name}
        onChange={(e) =>
          setForm({ ...form, name: e.target.value.trimStart() })
        }
      />

      <input
        placeholder="Phone"
        value={form.phone}
        onChange={(e) =>
          setForm({ ...form, phone: e.target.value })
        }
      />

      <select
        value={form.source}
        onChange={(e) =>
          setForm({ ...form, source: e.target.value })
        }
      >
        <option>Call</option>
        <option>WhatsApp</option>
        <option>Field</option>
      </select>

      <button
        onClick={handleSubmit}
        disabled={loading || !form.name || !form.phone}
      >
        {loading ? "Adding..." : "Add Lead"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}