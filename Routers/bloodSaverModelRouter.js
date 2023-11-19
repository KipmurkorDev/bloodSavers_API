const express = require("express");
const multer = require("multer");
const authMiddleware = require("../Middleware/authVerification");
const {
  userSignup,
  userLogin,
  getHeros,
  getDonors,
  getSearch,
  getDonorDetail,
  getRecipient,
} = require("../Controllers/bloodSaverModelController");
const { storage } = require("../Script/cloudinary");

const upload = multer({ storage });

const userRouter = express.Router();

userRouter.post("/signup", upload.single("profile"), userSignup);
userRouter.post("/login", userLogin);
userRouter.get("/", getDonors);
userRouter.get("/search", getSearch);
userRouter.get("/recipient", getRecipient);
userRouter.get("/heros", getHeros);
userRouter.use(authMiddleware);
userRouter.get("/:donorId", getDonorDetail);

module.exports = userRouter;
