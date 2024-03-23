const mongoose = require("mongoose");
const { Schema } = mongoose;
// const {xtsAccountType, zerodhaAccountType} = require("../../constant");

const stockIndexSchema = new mongoose.Schema({
  displayName: {
    type: String,
    required: true,
  },
  exchange: {
    type: String,
    required: true,
  },
  instrumentSymbol: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  instrumentToken: {
    type: Number,
    required: true,
  },
  createdOn: {
    type: Date,
    required: true,
    default: () => new Date(),
  },
  lastModifiedOn: {
    type: Date,
    required: true,
    default: () => new Date(),
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "user-personal-detail",
    // required : true
  },
  lastModifiedBy: {
    type: Schema.Types.ObjectId,
    ref: "user-personal-detail",
    // required : true
  },
  accountType: {
    type: String,
    required: true,
    // enum : [zerodhaAccountType, xtsAccountType]
  },
  exchangeSegment: {
    type: Number,
    // required : true
  },
});

const stockIndexDetail = mongoose.model("stock-index", stockIndexSchema);
module.exports = stockIndexDetail;
