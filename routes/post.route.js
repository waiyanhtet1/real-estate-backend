const express = require("express");
const {
  getPosts,
  getPost,
  addPost,
  updatePost,
  deletePost,
} = require("../controllers/post.controller");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

router.get("/", getPosts);
router.get("/:id", getPost);
router.post("/", requireAuth, addPost);
router.put("/:id", requireAuth, updatePost);
router.delete("/:id", requireAuth, deletePost);

module.exports = {
  getPosts,
  getPost,
  addPost,
  updatePost,
  deletePost,
};

module.exports = router;
