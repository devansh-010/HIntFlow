require("dotenv").config();
console.log("Key loaded:", !!process.env.NIM_API_KEY);

const express = require("express");
const cors = require("cors");

const hintRoutes = require("./routes/hintRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "HintFlow Backend Running"
  });
});

app.use("/api", hintRoutes);

const PORT = 5000;

const { testNimConnection } = require("./services/nimService");

testNimConnection()
  .then((data) => {
    console.log("NIM RESPONSE:");
    console.log(JSON.stringify(data, null, 2));
  })
  .catch((error) => {
    console.log("Failed to connect to NIM");
  });

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});