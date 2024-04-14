const bcrypt = require("bcrypt");
const prisma = require("../lib/prisma");

const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    //   hash password
    const hashPassword = await bcrypt.hash(password, 10);

    //   send prisma and store in db
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashPassword,
      },
    });
    res
      .status(201)
      .json({ message: "User created successfully!", user: newUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  //   find username in db
  const user = await prisma.user.findUnique({
    where: { username },
  });
  if (!user)
    return res.status(401).json({ message: "No user with this name found!" });

  // check password correct
  const isPassValid = await bcrypt.compare(password, user.password);
  if (!isPassValid)
    return res.status(401).json({ message: "Incorrect Password!" });

  // set token and send to user

  res.status(201).json({ message: "Correct!" });
};

const logout = (req, res) => {
  console.log("logout");
};

module.exports = { register, login, logout };
