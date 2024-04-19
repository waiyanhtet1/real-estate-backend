const express = require("express");
const authRoute = require("./routes/auth.route");
const userRoute = require("./routes/user.route");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server Running on ${PORT}`));
