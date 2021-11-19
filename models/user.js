const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const Ratings = require('./ratings')
const House = require('./house')
const Rent = require('./rent')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    userType: {
        type: String,
        default: 'normal',
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error ('Email not valid')
            }
        },
        trim: true,
        loadClass:true
    },
    password: {
        type: String,
        required: true,
        default: 'qwer   yuio   plmbvcxd    hjhghjb guytgfuyg',
        trim : true,
        validate(value){
            if(value.length<6) {
                throw new Error('Password need to be atleast 6 word')
            }
            if(value==='password') {
                throw new Error('password can not be password')
            }
        }
    },
    phoneNumber: {
        type: String,
        required: true,
        trim: true
    },
    address: {
        type: String,
        trim: true
    },
    gender: {
        type: String,
        validate(value){
            if(value !== 'male' && value !== 'female') throw new Error('Gender Not Correct')
        }
    },
    dateOfBirth: {
        type: String,
        trim: true
    },
    profilePicture : {
        type: Buffer
    },
    bookmarkedHouse: [{
        type:String
    }],
    tokens: [{
        token: {
            type:String,
            required: true
        }
    }]
},{
    timestamps: true
})

//Authentication token
userSchema.methods.generateAuthToken = async function(){
    const user = this
    const token = jwt.sign({ _id: user._id.toString() },process.env.jwt)

    user.tokens = user.tokens.concat({token})

    await user.save()
    return token
}

userSchema.pre('save', async function(next) {
    const user = this

    if(user.isModified('password')){
        const salt = await bcrypt.genSalt(10); //10 rounds
        user.password = await bcrypt.hash(user.password, salt); 
    }

    next()
})

userSchema.statics.findByCredential = async (email,password) => {
    const user = await User.findOne({ email })
    
    //normal new Error not work here
    //we made a custom error 
    function myError (message) {
        this.message = message
    }

    myError.prototype = new Error()
    
    if(!user) throw new myError('Email Not Match')
    
    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch) throw new myError('Password Not Match')
    
    return user
}

userSchema.pre('remove', async function(next) {
    const user = this

    const rent = await Rent.find({ houseSeekerId: user._id })

    for(let i=0; i<rent.length;i++){
        const house = await House.findByIdAndUpdate(
            rent[i].houseId,
            { houseStatus:'available' },
            { new: true }
        )
        house.save()
    }

    await Ratings.deleteMany({
        houseOwnerId  : user._id
    })
    
    await House.deleteMany({
        houseOwnerId  : user._id
    })
    await Rent.deleteMany({ 
        $or: [ { houseSeekerId: user._id }, { houseOwnerId: user._id } ] 
    })

    next()
})

const User = mongoose.model('user',userSchema)
module.exports = User