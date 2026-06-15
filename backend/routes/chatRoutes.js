const express = require("express");
const router = express.Router();

const {
  chatWithMentor
} = require("../controllers/chatController");

router.post("/chat", chatWithMentor);

module.exports = router;