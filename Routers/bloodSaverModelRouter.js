const express = require("express");
const multer = require("multer");
const fs = require("fs");
const authMiddleware = require("../Middleware/authVerification");
const path = require("path");
const {
  userSignup,
  userLogin,
  getDonors,
  getSearch,
  getDonorDetail,
} = require("../Controllers/bloodSaverModelController");

const UPLOAD_PATH = path.join(__dirname, "../tmp");
const PROFILE_FIELD_NAME = "tmp";

if (!fs.existsSync(UPLOAD_PATH)) {
  fs.mkdirSync(UPLOAD_PATH);
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOAD_PATH);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

const userRouter = express.Router();

userRouter.post("/signup", upload.single(PROFILE_FIELD_NAME), userSignup);
userRouter.post("/login", userLogin);
userRouter.get("/", getDonors);
userRouter.get("/search", getSearch);
userRouter.use(authMiddleware);
userRouter.get("/:donorId", getDonorDetail);

module.exports = userRouter;
