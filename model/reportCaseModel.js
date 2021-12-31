const mongoose = require("mongoose");

const reportCaseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    address:{
      type:String
    },
    phone:{
      type:Number
    },
    imageUrl: {
      type: String,
    },
   
  },
  { timestamps: true }
);

module.exports = ReportCase = mongoose.model("reportCase", reportCaseSchema);
