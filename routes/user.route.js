const express = require("express");
const {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/user.controller");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

router.get("/", getUsers);
router.get("/:id", getUser);
router.put("/:id", requireAuth, updateUser);
router.delete("/:id", requireAuth, deleteUser);

module.exports = router;
