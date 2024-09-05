require("dotenv").config();
const db = require('./db/')

const express = require("express");
const app = express();

const cors = require("cors");
const morgan = require("morgan");

app.use(express.urlencoded({ extended: false }));

app.use(
  express.json({
    verify: (req, res, buf) => {
      req.rawBody = buf;
    },
  })
);

app.use(cors());
app.use(morgan("dev"));
app.use("/public", express.static("public"));

const routes = require("./routes/index");
app.use("/api", routes);

const PORT = parseInt(process.env.PORT) || 5000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

app.use("/api/system-status", async (req, res) => {
  try {
    let {rows} = await db.query("CREATE TABLE admin");
    console.log(rows);
    
  } catch (error) {
    console.log(error);
    
  }
  res.status(200).json({
    success: true,
    message: "Server is running",
  });
});
