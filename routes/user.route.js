const express = require("express");
const {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  savePost,
} = require("../controllers/user.controller");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

router.get("/", getUsers);
router.get("/:id", getUser);
router.put("/:id", requireAuth, updateUser);
router.delete("/:id", requireAuth, deleteUser);
router.post("/save", requireAuth, savePost);

module.exports = router;
