const mongoose = require("mongoose");
const { Schema } = mongoose;
// const {xtsAccountType, zerodhaAccountType} = require("../../constant");

const equityStockSchema = new mongoose.Schema({
  instrument_token: {
    type: Number,
    required: true,
  },
  exchange_token: {
    type: Number,
    required: true,
  },
  tradingsymbol: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  // last_price:{
  //     type: Number,
  //     // required : true
  // },
  // expiry:{
  //     type: String,
  //     required : true
  // },
  strike: {
    type: Number,
    required: true,
  },
  tick_size: {
    type: Number,
    required: true,
  },
  // lot_size:{
  //     type: Number,
  //     required : true
  // },
  instrument_type: {
    type: String,
    required: true,
  },
  segment: {
    type: String,
    required: true,
  },
  exchange: {
    type: String,
    required: true,
  },
  accountType: {
    type: String,
    // required : true,
    // enum : [zerodhaAccountType, xtsAccountType],
    // default: zerodhaAccountType
  },
  lastModifiedBy: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "user-personal-detail",
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "user-personal-detail",
  },
  lastModifiedOn: {
    type: Date,
    required: true,
    default: () => new Date(),
  },
  createdOn: {
    type: Date,
    required: true,
    default: () => new Date(),
  },
  status: {
    type: String,
    required: true,
    default: "Active",
  },
  // chartInstrument: {
  //     type: String,
  // }
});

const EquityStock = mongoose.model("equity-instrument", equityStockSchema);
module.exports = EquityStock;
