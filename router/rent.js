const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const Rent = require("../models/rent");
const House = require("../models/house");
const { isValidObjectId } = require("mongoose");

module.exports = (app) => {
    //create rent //DONE
    app.post('/api/rent', auth, async(req,res) => {
        const house = await House.findById(req.body.houseId)
        if (!house) return res.status(401).send("House Not Found")

        if(house.houseStatus === 'rented') return res.status(400).send("This house already rented")
        if(house.houseOwnerId.toString() === req.user._id.toString()) return res.status(400).send("House owner can not rent own house.")
        const rent = new Rent ({
            houseId : house._id,
            houseOwnerId : house.houseOwnerId,
            houseSeekerId : req.user._id
        })

        try {
            await rent.save()
            res.status(200).send(rent)
        } catch (error) {
            res.status(400).send(Object.entries(e.errors)[0][1].message);
        }
    })

    // view rent house by house seeker //DONE
    app.get('/api/rent/view/:id',  async(req,res)=>{
        const rent = await Rent.find({
            houseSeekerId: req.params.id
        }).populate('houseId',['houseAddress','totalRoomNo','size','rentFee'])
        .populate('houseOwnerId','name')

        try {
            res.status(200).send(rent)
        } catch (error) {
            res.status(400).send(error)
        }
    })

    // view rent house by id
    app.get('/api/rent/id/:id', auth, async(req,res)=>{
        if(!isValidObjectId(req.params.id)) return res.status(400).send('Rent Id Not valid')
        
        const rent = await Rent.findById(req.params.id)
        if(!rent) return res.status(400).send('Rent Not Found')

        userId = req.user._id.toString()

        if(rent.houseOwnerId.toString() !== userId && rent.houseSeekerId.toString() !== userId) return res.status(401).send("Only House Owner or House Seeker can view This.")

        try {
            res.status(200).send(rent)
        } catch (error) {
            res.status(400).send(error)
        }
    })

    // admin can view rent by id
    app.get('/api/rent/a/:id', admin, async(req,res)=>{
        if(!isValidObjectId(req.params.id)) return res.status(400).send('Rent Id Not valid')

        const rent = await Rent.findById(req.params.id)
        if(!rent) return res.status(400).send('Rent Not Found')

        try {
            res.status(200).send(rent)
        } catch (error) {
            res.status(400).send(error)
        }
    })

    // Admin can view rent list
    app.get('/api/rent', admin, async(req,res)=>{
        const rent = await Rent.find({})

        try {
            res.status(200).send(rent)
        } catch (error) {
            res.status(400).send(error)
        }
    })
}

