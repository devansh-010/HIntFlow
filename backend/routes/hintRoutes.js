const express = require("express");
const router = express.Router();

const { generateHint } = require("../controllers/hintController");

router.post("/generate-hint", generateHint);

module.exports = router;