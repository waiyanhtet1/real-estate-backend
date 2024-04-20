const prisma = require("../lib/prisma");

const getPosts = async (req, res) => {
  try {
    const posts = await prisma.post.findMany();
    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Fail to get posts!" });
  }
};

const getPost = async (req, res) => {
  const id = req.params.id;
  try {
    const post = await prisma.post.findUnique({
      where: { id },
      // for detail page need to get post detail some user info
      include: {
        postDetail: true,
        user: {
          select: { username: true, avatar: true }, // user info only need name and pic
        },
      },
    });

    // check post is found or not
    if (!post) return res.status(404).json({ message: "No post found!" });

    res.status(200).json(post);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Fail to get post!" });
  }
};

const addPost = async (req, res) => {
  const body = req.body;

  console.log(req.body);

  try {
    // create data in post model
    const addPost = await prisma.post.create({
      data: {
        ...body.postData,
        userId: req.userId, // userid is required in post model for connect user model
        postDetail: {
          create: body.postDetail, // create for postDetail in different object
        },
      },
    });

    res.status(200).json(addPost);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Fail to add post!" });
  }
};

const updatePost = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Fail to update post!" });
  }
};

const deletePost = async (req, res) => {
  const id = req.params.id;

  try {
    // get userId from related post
    const post = await prisma.post.findUnique({
      where: { id },
    });

    // check if user has authorized or not
    if (post.userId !== req.userId)
      return res.status(403).json({ message: "No Authorized or not!" });

    // find in post model by id and remove query
    await prisma.post.delete({
      where: { id },
    });
    res.status(200).json({ message: "Post Deleted!" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Fail to delete post!" });
  }
};

module.exports = { getPosts, getPost, addPost, updatePost, deletePost };
