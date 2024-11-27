const pool = require("../db");

exports.addNewItem = async (req, res) => {
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
};

exports.getAllItems = async (req, res) => {
  try {
    const allItems = await pool.query("SELECT * FROM items");
    res.json(allItems.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.getItemById = async (req, res) => {
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
};

exports.updateItemById = async (req, res) => {
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
};

exports.deleteById = async (req, res) => {
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
};
