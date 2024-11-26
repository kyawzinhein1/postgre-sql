const express = require("express");
const pool = require("./db");

const app = express();

app.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.send(`Database time: ${result.rows[0].now}`);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Database connection error");
  }
});

app.listen(5000, () => console.log("Server is running on port 5000"));
