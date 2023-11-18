const bloodSaverModel = require("../Model/bloodSaverModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

const userSignup = async (req, res) => {
  try {
    const {
      name,
      email,
      userType,
      password,
      country,
      bloodGroup,
      state,
      city,
      phone,
    } = req.body;

    const errors = {};
    if (!name) errors.name = "Full Name is required.";
    if (!email) errors.email = "Email is required.";
    if (!password) errors.password = "Password is required.";
    if (!req.file) errors.profile = "Profile picture is required.";
    if (!country) errors.country = "Country is required.";
    if (!bloodGroup) errors.bloodGroup = "Blood Group is required.";
    if (!state) errors.state = "State is required.";
    if (!city) errors.city = "City is required.";
    if (!phone) errors.phone = "Phone is required.";
    if (Object.keys(errors).length > 0) {
      return res.status(400).json({
        status: "error",
        errors,
      });
    }

    const existingUser = await bloodSaverModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        status: "error",
        message: "User already registered",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 8);

    await bloodSaverModel.create({
      name,
      email,
      country,
      bloodGroup,
      state,
      city,
      phone,
      userType,
      profile: req.file.path,
      password: hashedPassword,
    });

    return res.status(201).json({
      status: "success",
      message: "User successfully registered",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "An internal server error occurred. Please try again later.",
      error: error.message,
    });
  }
};

const getDonors = async (req, res) => {
  try {
    const response = await bloodSaverModel.find(
      { userType: "donor" },
      { name: 1, profile: 1, bloodGroup: 1, city: 1, country: 1 }
    );
    return res.status(200).json({ status: "success", data: response });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error occurred.",
      error: error.message,
    });
  }
};
const getSearch = async (req, res) => {
  try {
    const { name, bloodGroup } = req.query;

    if (!bloodGroup) {
      return res.status(400).json({
        status: "error",
        message: "The 'bloodGroup' parameter is required for the search.",
      });
    }

    const cleanedBloodGroup = bloodGroup.replace(/\s/g, "");

    const uppercaseBloodGroup = cleanedBloodGroup.toUpperCase();
    let searchBloodGroup;

    if (!uppercaseBloodGroup.includes("-")) {
      searchBloodGroup = uppercaseBloodGroup + "+";
    } else {
      searchBloodGroup = uppercaseBloodGroup;
    }
    const response = await bloodSaverModel.find(
      {
        $or: [
          {
            $and: [
              { name: name },
              { $or: [{ country: name }, { city: name }] },
            ],
          },
          { bloodGroup: searchBloodGroup },
        ],
      },
      { name: 1, profile: 1, bloodGroup: 1, city: 1, country: 1 }
    );

    return res.status(200).json({ status: "success", data: response });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "error",
      message: "Internal server error occurred.",
      error: error.message,
    });
  }
};

const getDonorDetail = async (req, res) => {
  const { donorId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(donorId)) {
    return res.status(400).json({
      status: "error",
      message: "Invalid donor ID format",
    });
  }

  try {
    const donor = await bloodSaverModel.findOne({ _id: donorId });

    if (!donor) {
      return res.status(404).json({
        status: "error",
        message: "Donor not found",
      });
    }

    const sanitizedDonor = {
      _id: donor._id,
      name: donor.name,
      profile: donor.profile,
      userType: donor.userType,
      country: donor.country,
      bloodGroup: donor.bloodGroup,
      state: donor.state,
      city: donor.city,
      phone: donor.phone,
    };

    return res.status(200).json({
      status: "success",
      data: sanitizedDonor,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "error",
      message: "An internal server error occurred. Please try again later.",
      error: error.message,
    });
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const errors = {};
    if (!email) {
      errors.email = "Email is required.";
    }
    if (!password) {
      errors.password = "Password is required.";
    }

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({
        status: "error",
        errors,
      });
    }
    const user = await bloodSaverModel.findOne({ email });
    if (user) {
      const confirmPassword = await bcrypt.compare(password, user.password);
      if (confirmPassword) {
        const token = jwt.sign(
          { name: user.name, userId: user._id },
          process.env.JWT_KEY
        );
        return res.status(200).json({
          token,
          status: "success",
          message: "Successful Login",
        });
      } else {
        return res.status(401).json({
          status: "error",
          message:
            "Wrong email or password. Please check your credentials and try again.",
        });
      }
    } else {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

module.exports = {
  userSignup,
  userLogin,
  getDonors,
  getSearch,
  getDonorDetail,
};
