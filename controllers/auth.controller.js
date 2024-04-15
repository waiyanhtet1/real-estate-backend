const bcrypt = require("bcrypt");
const prisma = require("../lib/prisma");
const jwt = require("jsonwebtoken");

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
    res.status(500).json({ message: "Fail to register!" });
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
  const age = 1000 * 60 * 60 * 24 * 7;
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, {
    expiresIn: age,
  });

  res
    .cookie("token", token, {
      httpOnly: true,
      maxAge: age,
    })
    .status(200)
    .json({ message: "Login Successfully!" });
};

const logout = (req, res) => {
  res.clearCookie("token").status(200).json({ message: "Logout Success!" });
};

module.exports = { register, login, logout };
