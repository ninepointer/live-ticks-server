const mongoose = require("mongoose");
const { Schema } = mongoose;

const contestInstrumentSchema = new mongoose.Schema({
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
    contest:{
        name:String,
        contestId:{type: Schema.Types.ObjectId,ref: 'contest'}
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

})

const instrumentDetail = mongoose.model("contest-instrument-detail", contestInstrumentSchema);
module.exports = instrumentDetail;