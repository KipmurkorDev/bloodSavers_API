const authorRouter = require("./bloodSaverModelRouter");

const express = require("express");
const router = express.Router();

router.use("/blood-savers", authorRouter);

module.exports = router;
