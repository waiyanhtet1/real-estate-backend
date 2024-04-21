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

const whitelist = [
  "http://localhost:5173",
  "https://real-estate-backend-8xxt.onrender.com",
];
const corsOptions = {
  credentials: true, // This is important.
  origin: (origin, callback) => {
    if (whitelist.includes(origin)) return callback(null, true);

    callback(new Error("Not allowed by CORS"));
  },
};
app.use(cors(corsOptions));

app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server Running on ${PORT}`));
