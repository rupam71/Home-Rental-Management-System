const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async (req, res, next) => {
    
    try{
        const token = req.header('x-auth-token')
        const decoded = jwt.verify(token, process.env.jwt)
        const user = await User.findOne({_id: decoded._id, 'tokens.token': token})
               
        if(!user) throw new Error()

        req.user = user
        req.token = token
        
        next()
    } catch(e){
        res.status(401).send('please authenticate')
    }
}

module.exports = auth