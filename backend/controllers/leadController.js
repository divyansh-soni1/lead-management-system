exports.addLead = async (req, res) => {
  try {
    const { name, phone, source } = req.body;

    // ✅ Validation
    if (!name || name.trim().length < 2) {
      return res.status(400).json({ error: "Name must be at least 2 characters" });
    }

    if (!phone || !/^[0-9]{10}$/.test(phone)) {
      return res.status(400).json({ error: "Phone must be 10 digits" });
    }

    const allowedSources = ["Call", "WhatsApp", "Field"];
    if (!allowedSources.includes(source)) {
      return res.status(400).json({ error: "Invalid source" });
    }

    const result = await pool.query(
      `INSERT INTO leads (name, phone, source)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [name.trim(), phone, source]
    );

    res.json(result.rows[0]);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.updateLead = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // ✅ Validation
    const allowedStatus = ["Interested", "Not Interested", "Converted"];

    if (!allowedStatus.includes(status)) {
      return res.status(400).json({ error: "Invalid status value" });
    }

    // Optional: check if lead exists
    const check = await pool.query("SELECT * FROM leads WHERE id=$1", [id]);
    if (check.rows.length === 0) {
      return res.status(404).json({ error: "Lead not found" });
    }

    const result = await pool.query(
      `UPDATE leads SET status=$1 WHERE id=$2 RETURNING *`,
      [status, id]
    );

    res.json(result.rows[0]);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};


exports.getLeads = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM leads ORDER BY created_at DESC"
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.deleteLead = async (req, res) => {
  try {
    const { id } = req.params;

    const check = await pool.query("SELECT * FROM leads WHERE id=$1", [id]);
    if (check.rows.length === 0) {
      return res.status(404).json({ error: "Lead not found" });
    }

    await pool.query("DELETE FROM leads WHERE id=$1", [id]);

    res.json({ message: "Deleted successfully" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};