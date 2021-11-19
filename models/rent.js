const mongoose = require('mongoose');
const House = require('./house');

const rentSchema = new mongoose.Schema({
    houseId : { type: mongoose.Schema.Types.ObjectId, ref: 'house' },
    houseOwnerId : { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    houseSeekerId : { type: mongoose.Schema.Types.ObjectId, ref: 'user' }
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

