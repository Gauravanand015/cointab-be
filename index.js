const express = require("express");
const cors = require("cors");
const { userRoute } = require("./routes/user");
const { connection } = require("./config/db");
const { PostRoutes } = require("./routes/post");

require("dotenv").config();
const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Cointab Assignment");
});

app.use("/", userRoute);
app.use("/", PostRoutes);

app.listen(process.env.PORT, async () => {
  try {
    await connection.sync();
    console.log(
      "Connected to the database" +
        "\n" +
        `Connected to the Port ${process.env.PORT}`
    );
  } catch (error) {
    console.log({ Message: "Connection error", Error: error });
  }
});
