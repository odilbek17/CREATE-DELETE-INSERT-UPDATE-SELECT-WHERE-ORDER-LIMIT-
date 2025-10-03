const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Database ulanish
const pool = new Pool({
  user: "postgres",    // o'zingdagi user
  host: "localhost",
  database: "todo_db", // app.sql da yaratiladigan DB
  password: "1234",    // postgres paroling
  port: 5432,
});

// Test
app.get("/", (req, res) => {
  res.send("Postgres ToDo API ishlayapti ✅");
});

// Add todo
app.post("/todos", async (req, res) => {
  const { title, description } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO todos (title, description) VALUES ($1, $2) RETURNING *",
      [title, description]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all todos
app.get("/todos", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM todos ORDER BY id DESC");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update (edit)
app.put("/todos/:id", async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  try {
    const result = await pool.query(
      "UPDATE todos SET title=$1, description=$2, updated_at=NOW() WHERE id=$3 RETURNING *",
      [title, description, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Mark as done
app.patch("/todos/:id/done", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "UPDATE todos SET done=TRUE, updated_at=NOW() WHERE id=$1 RETURNING *",
      [id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete
app.delete("/todos/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM todos WHERE id=$1", [id]);
    res.json({ message: "Todo o'chirildi", id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => {
  console.log("✅ Server http://localhost:3000 da ishlayapti");
});
