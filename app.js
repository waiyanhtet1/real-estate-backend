const express = require("express");
const authRoute = require("./routes/auth.route");

const app = express();

app.use(express.json());

app.use("/api/auth", authRoute);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server Running on ${PORT}`));
