const mongoose = require("mongoose");

const bloodSaverSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  profile: {
    type: String,
    required: true,
  },

  userType: {
    type: String,
    default: "donor",
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: true,
  },
  country: {
    type: String,
    trim: true,
    default: "Unknown",
    required: true,
  },
  bloodGroup: {
    type: String,
    trim: true,
    required: true,
  },
  state: {
    type: String,
    trim: true,
    required: true,
  },
  city: {
    type: String,
    trim: true,
    required: true,
  },
  phone: {
    type: String,
    trim: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const bloodSaverModel = mongoose.model("bloodsavers", bloodSaverSchema);
module.exports = bloodSaverModel;
