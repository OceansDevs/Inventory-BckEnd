const express = require("express");
const router = express.Router();
const {
  getInventories,
  getInventoriesById,
  createInventory,
  updateInventory,
  deleteInventory,
} = require("../controllers/inventControl");

router.get("/", getInventories);
router.get("/download", getInventories);
router.get("/:id", getInventoriesById);
router.post("/", createInventory);
router.patch("/:id", updateInventory);
router.delete("/:id", deleteInventory);

module.exports = router;
