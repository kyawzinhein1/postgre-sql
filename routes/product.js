const { Router } = require("express");

const router = Router();

const productController = require("../controllers/products");

// connection test
// router.get("/", async (req, res) => {
//   try {
//     const result = await pool.query("SELECT NOW()");
//     res.send(`Database time: ${result.rows[0].now}`);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Database connection error");
//   }
// });

// POST
// Add a new item
router.post("/items", productController.addNewItem);

// GET
// Get all items
router.get("/items", productController.getAllItems);

// GET
// Get a single item by ID
router.get("/items/:id", productController.getItemById);

// PUT
// Update an item by ID
router.put("/items/:id", productController.updateItemById);

// DELETE
// Delete an item by ID
router.delete("/items/:id", productController.deleteById);

module.exports = router;
