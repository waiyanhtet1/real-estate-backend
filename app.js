const express = require("express");
const authRoute = require("./routes/auth.route");
const userRoute = require("./routes/user.route");
const postRoute = require("./routes/post.route");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const cors = require("cors");

const app = express();

app.use(express.json());
// app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));

const corsOptions = {
  credentials: true, // This is important.
  origin: "http://localhost:5173" || "https://real-estate-ui-rose.vercel.app/",
};
app.use(cors(corsOptions));

app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server Running on ${PORT}`));
