const express = require("express");
const pool = require("./db");

const app = express();

// Middleware
app.use(express.json()); // Parse JSON requests

// connection test
app.get("/", async (req, res) => {
    try {
        const result = await pool.query("SELECT NOW()");
        res.send(`Database time: ${result.rows[0].now}`);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Database connection error");
    }
});

// POST
// Add a new item
app.post("/items", async (req, res) => {
    const { name, description } = req.body;
    try {
        const newItem = await pool.query(
            "INSERT INTO items (name, description) VALUES ($1, $2) RETURNING *",
            [name, description]
        );
        res.json(newItem.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

// GET
// Get all items
app.get("/items", async (req, res) => {
    try {
        const allItems = await pool.query("SELECT * FROM items");
        res.json(allItems.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

// GET
// Get a single item by ID
app.get("/items/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const item = await pool.query("SELECT * FROM items WHERE id = $1", [id]);
        if (item.rows.length === 0) {
            return res.status(404).send("Item not found");
        }
        res.json(item.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

// PUT
// Update an item by ID
app.put("/items/:id", async (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;
    try {
        const updatedItem = await pool.query(
            "UPDATE items SET name = $1, description = $2 WHERE id = $3 RETURNING *",
            [name, description, id]
        );
        if (updatedItem.rows.length === 0) {
            return res.status(404).send("Item not found");
        }
        res.json(updatedItem.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

// DELETE
// Delete an item by ID
app.delete("/items/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const deletedItem = await pool.query(
            "DELETE FROM items WHERE id = $1 RETURNING *",
            [id]
        );
        if (deletedItem.rows.length === 0) {
            return res.status(404).send("Item not found");
        }
        res.json({
            message: "Item deleted successfully",
            item: deletedItem.rows[0],
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
