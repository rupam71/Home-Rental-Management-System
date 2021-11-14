const mongoose = require('mongoose');
const House = require('./house');

const rentSchema = new mongoose.Schema({
    houseId : {
        type: String,
        required: true,
        trim:true
    },
    houseOwnerId : {
        type: String,
        required: true,
        trim:true
    },
    houseSeekerId : {
        type: String,
        required: true,
        trim:true
    }
},{
    timestamps: true
})

rentSchema.pre('save', async function(next){
    const rent = this;
    
    await House.findByIdAndUpdate(
        rent.houseId,
        {houseStatus:"rented"},
        {new:true}
    )
    
    next()
})

const Rent = mongoose.model('rent',rentSchema)
module.exports = Rent

