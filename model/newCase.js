const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    submittedBy: {
      type: String,
      required: true,
    },
    name: {
      type: String,
    },
    fatherName:{
      type:String
    },
    age:{
      type:Number
    },
    phone: {
      type: String,
    },
    caseId:{
      type:Number
    }
  },
  { timestamps: true }
);

module.exports = User = mongoose.model("user", userSchema);
