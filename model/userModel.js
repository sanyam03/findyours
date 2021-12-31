const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    phone: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    reportUrl: [
      {
        type: String,
      },
    ],
    token: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = User = mongoose.model("user", userSchema);
