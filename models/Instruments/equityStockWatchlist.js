const mongoose = require("mongoose");
const { Schema } = mongoose;
const {xtsAccountType, zerodhaAccountType} = require("../../constant");


const equityInstrumentSchema = new mongoose.Schema({
    name:{
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
    instrumentToken:{
        type: Number,
        required : true
    },
    exchangeInstrumentToken:{
        type: Number,
        required : true
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
        default: ()=>new Date(),
        required : true
    },
    lastModifiedOn:{
        type: Date,
        default: ()=>new Date(),
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
    },
    users: [
        {
            type: Schema.Types.ObjectId,
            ref: "user-personal-details"
        } 
    ]
})

const instrumentDetail = mongoose.model("stock-instrument-detail", equityInstrumentSchema);
module.exports = instrumentDetail;