import { useEffect, useState } from "react";
import { getLeads } from "./api";
import LeadForm from "./components/LeadForm";
import LeadList from "./components/LeadList";
import Dashboard from "./components/Dashboard";

function App() {
  const [leads, setLeads] = useState([]);
  const [search, setSearch] = useState("");

  const fetchLeads = async () => {
    const res = await getLeads();
    setLeads(res.data);
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const filtered = leads.filter((l) =>
    l.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: "20px" }}>
      <h1>Mini CRM</h1>

      <Dashboard leads={leads} />

      <input
        placeholder="Search by name..."
        onChange={(e) => setSearch(e.target.value)}
      />

      <LeadForm refresh={fetchLeads} />
      <LeadList leads={filtered} refresh={fetchLeads} />
    </div>
  );
}

export default App;