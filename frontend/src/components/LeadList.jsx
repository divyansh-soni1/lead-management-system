import { updateLead, deleteLead } from "../api";

export default function LeadList({ leads, refresh }) {
  return (
    <div>
      {leads.map((lead) => (
        <div
          key={lead.id}
          style={{
            border: "1px solid gray",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <p><b>{lead.name}</b> ({lead.phone})</p>
          <p>Source: {lead.source}</p>

          <select
            value={lead.status}
            onChange={(e) =>
              updateLead(lead.id, { status: e.target.value }).then(refresh)
            }
          >
            <option>Interested</option>
            <option>Not Interested</option>
            <option>Converted</option>
          </select>

          <button onClick={() => deleteLead(lead.id).then(refresh)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}