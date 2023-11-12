const express = require("express");
const multer = require("multer");
const authMiddleware = require("../Middleware/authVerification");
const {
  userSignup,
  userLogin,
  getDonors,
  getSearch,
  getDonorDetail,
} = require("../Controllers/bloodSaverModelController");
const { storage } = require("../Script/cloudinary");

const upload = multer({ storage });

const userRouter = express.Router();

userRouter.post("/signup", upload.single("profile"), userSignup);
userRouter.post("/login", userLogin);
userRouter.get("/", getDonors);
userRouter.get("/search", getSearch);
userRouter.use(authMiddleware);
userRouter.get("/:donorId", getDonorDetail);

module.exports = userRouter;
