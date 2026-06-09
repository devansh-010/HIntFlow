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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});