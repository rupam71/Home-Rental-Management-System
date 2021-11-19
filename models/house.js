const mongoose = require('mongoose')
const Ratings = require('./ratings')

const houseSchema = new mongoose.Schema({
    houseOwnerId : {
        type: String,
        required: true,
        trim:true
    },
    houseAddress : {
        type: String,
        required: true,
        trim:true
    },
    totalRoomNo : {
        type: Number,
        trim:true,
        default: 1
    },
    bedRoom : {
        type: Number,
        trim:true,
        default: 1
    },
    totalToilet : {
        type: Number,
        trim:true,
        default: 1
    },
    totalbalcony : {
        type: Number,
        trim:true,
        default: 0
    },
    size : {
        type: Number,
        required: true,
        trim:true
    },
    rentFee : {
        type: Number,
        required: true,
        trim:true
    },
    addittionalCharge : {
        type: Number,
        required: true,
        trim:true
    },
    description : {
        type: String,
        required: true,
        trim:true
    },
    houseStatus : {
        type: String,
        default: "available",
        trim:true,
        validate(value){
            if(value !== 'available' && value !== 'rented') throw new Error('House Status Not Correct')
        }
    },
    totalView:{
        type: Number,
        trim: true,
        default: 0
    },
    totalRented:{
        type: Number,
        trim: true,
        default: 0
    },
    houseImages: [{
        type:Buffer
    }],
    houseImagesLength:{
        type: Number,
        default: 0
    },
    bookmarkedBy: [{
        type:String
    }]
},{
    timestamps: true 
})

houseSchema.pre('remove', async function(next) {
    const house = this

    await Ratings.deleteMany({
        houseId : house._id
    })

    next()
})

const House = mongoose.model('house', houseSchema)
module.exports = House