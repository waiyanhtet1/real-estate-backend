const prisma = require("../lib/prisma");
const bcrypt = require("bcrypt");

const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Fail to get users!" });
  }
};

const getUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) return res.status(404).json({ message: "No User Found!" });

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Fail to get user!" });
  }
};

const updateUser = async (req, res) => {
  const id = req.params.id;
  const { password, ...inputs } = req.body;
  let hashedPassword;

  // check login user is authorized or not
  if (id !== req.userId)
    return res.status(403).json({ message: "No Authorized Access!" });

  try {
    // if password change to hash password
    if (password) hashedPassword = await bcrypt.hash(password, 10);

    // update user in database
    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        ...inputs,
        ...(hashedPassword && { password: hashedPassword }),
      },
    });
    res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Fail to update user!" });
  }
};

const deleteUser = async (req, res) => {
  const id = req.params.id;

  // check login user is authorized or not
  if (id !== req.userId)
    return res.status(403).json({ message: "No Authorized Access!" });

  try {
    await prisma.user.delete({
      where: { id },
    });
    res.status(200).json({ message: "User deleted!" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Fail to delete user!" });
  }
};

const savePost = async (req, res) => {
  const postId = req.body.postId;
  const tokenUserId = req.userId;

  try {
    const savedPost = await prisma.savedPost.findUnique({
      where: {
        userId_postId: {
          userId: tokenUserId,
          postId,
        },
      },
    });

    if (savedPost) {
      await prisma.savedPost.delete({
        where: {
          id: savedPost.id,
        },
      });
      res.status(200).json({ message: "Post removed!" });
    } else {
      await prisma.savedPost.create({
        data: {
          userId: tokenUserId,
          postId,
        },
      });
      res.status(200).json({ message: "Post saved!" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Fail to save post!" });
  }
};

module.exports = { getUsers, getUser, updateUser, deleteUser, savePost };
