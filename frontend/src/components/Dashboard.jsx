export default function Dashboard({ leads }) {
  const total = leads.length;
  const converted = leads.filter(l => l.status === "Converted").length;
  const interested = leads.filter(l => l.status === "Interested").length;

  return (
    <div style={{ marginBottom: "20px" }}>
      <h3>Dashboard</h3>
      <p>Total Leads: {total}</p>
      <p>Converted: {converted}</p>
      <p>Interested: {interested}</p>
    </div>
  );
}