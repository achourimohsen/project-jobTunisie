
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;


const jobTypeSchema = new mongoose.Schema({

    jobTypeName: {// issm naw3 job
        type: String,
        trim: true,
        required: [true, 'job category is required'],
        maxlength: 70,
    },

    user: {
        type: ObjectId,
        ref: "User",
        required: true
    },



}, { timestamps: true })

module.exports = mongoose.model("JobType", jobTypeSchema);