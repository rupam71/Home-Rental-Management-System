const mongoose = require('mongoose')

const ratingSchema = new mongoose.Schema({
    houseId : {
        type: String,
        required: true,
        trim:true
    },
    reviewerId : {
        type: String,
        required: true,
        trim:true
    },
    reviewerName : {
        type: String,
        required: true,
        trim:true
    },
    ratings : {
        type: Number,
        required: true,
        trim:true,
        validate(value){
            if(1 > value || value > 5 ) throw new Error('Ratings must be 1-5')
        }
    },
    review : {
        type: String,
        trim:true
    },
},{
    timestamps:true
})

const Ratings = mongoose.model('ratings',ratingSchema)
module.exports = Ratings