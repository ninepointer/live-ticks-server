const mongoose = require("mongoose");
const { Schema } = mongoose;
const {xtsAccountType, zerodhaAccountType} = require("../../constant");


const instrumentSchema = new mongoose.Schema({
    instrument:{
        type: String,
        required: true
    },
    exchange:{
        type: String,
        required : true
    },
    symbol:{
        type: String,
        required : true
    },
    status:{
        type: String,
        required : true
    },
    uId:{
        type: String,
        required : true
    },
    lotSize:{
        type: Number,
        required : true
    },
    instrumentToken:{
        type: Number,
        required : true
    },
    exchangeInstrumentToken:{
        type: Number,
        required : true
    },
    contractDate:{
        type: Date,
        required : true
    },
    maxLot:{
        type: Number,
        required : true
    },  
    isAddedWatchlist: {
        type: Boolean,
        required : true,
        default: true
    },
    accountType:{
        type: String,
        // required : true,
        enum : [zerodhaAccountType, xtsAccountType]
    },
    exchangeSegment:{
        type: Number,
        // required : true
    },
    createdOn:{
        type: Date,
        default: new Date(),
        required : true
    },
    lastModifiedOn:{
        type: Date,
        default: new Date(),
        required : true
    },
    createdBy:{
        type: Schema.Types.ObjectId,
        ref: 'user-personal-details',
        required: true
    },
    lastModifiedBy:{
        type: Schema.Types.ObjectId,
        ref: 'user-personal-details',
        required: true,
    },
    chartInstrument: {
        type: String,
    }
})

const instrumentDetail = mongoose.model("infinity-instrument", instrumentSchema);
module.exports = instrumentDetail;