const auth = require('../middleware/auth')
const admin = require('../middleware/admin')
const Ratings = require('./../models/ratings')
const House = require('../models/house')

module.exports = (app) => {
    //create ratings //DONE
    app.post('/api/ratings', auth, async (req,res)=>{
        try {
            const house =   House.findById(req.body.houseId)
            if (!house) return res.status(400).send('House Not Found')
            
            const ratings = new Ratings({
                reviewerId : req.user._id,
                reviewerName : req.user.name,
                ...req.body
            })

            await ratings.save()
            res.status(200).send(ratings)
        } catch (e) {
            res.status(400).send(Object.entries(e.errors)[0][1].message);
        }
    })

    //Edit ratings //DONE
    app.patch('/api/ratings/:id', auth, async (req,res) => {
        
            const ratings = await Ratings.findByIdAndUpdate(
                req.params.id,
                {...req.body},
                {new:true}
            )

            if(!ratings) return res.status(400).send("Ratings Not Found")
            if(ratings.reviewerId.toString() !== req.user._id.toString()) return res.status(401).send("Only Reviewer Can Edit")

        try {
            await ratings.save()
            res.status(200).send(ratings)
        } catch (e) {
            res.status(400).send(Object.entries(e.errors)[0][1].message);
        }
    })

    //view ratings by id //DONE
    app.get('/api/ratings/:id', async (req,res)=> {
        try {
            const ratings = await Ratings.findById(req.params.id)
            if(!ratings) return res.status(400).send('Ratings not found')

            res.status(200).send(ratings)
        } catch (error) {
            res.status(400).send(error)
        }
    })

    //view all ratings of a single house //DONE
    app.get('/api/ratings/h/:id', async(req,res)=>{
        try {
            const ratings = await Ratings.find({houseId:req.params.id})
            if(!ratings) return res.status(400).send('This House have no ratings')

            res.status(200).send(ratings)
        } catch (error) {
            res.status(400).send(error)
        }
    })

    //delete single ratings //DONE
    app.delete('/api/ratings/:id', auth, async(req,res)=>{
        try {
            const ratings = await Ratings.findById(req.params.id)
            if(!ratings) return res.status(400).send('Ratings not found')

            if(ratings.reviewerId.toString() !== req.user._id.toString()) return res.status(401).send("Only Reviewer Can Delete")

            await ratings.remove()
            res.status(200).send(ratings)
        } catch (error) {
            res.status(400).send(error)
        }
    })

    //delete single ratings by admin
    app.delete('/api/ratings/a/:id', admin, async(req,res)=>{
        try {
            const ratings = await Ratings.findByIdAndDelete(req.params.id)
            if(!ratings) return res.status(400).send('Ratings not found')

            res.status(200).send(ratings)
        } catch (error) {
            res.status(400).send(error)
        }
    })

    //delete single ratings by house owner //DONE
    app.delete('/api/ratings/ho/:id', auth, async(req,res) => {
        try {
            const ratings = await Ratings.findById(req.params.id)
            if(!ratings) return res.status(400).send('Ratings not found')

            const house = await House.findById(ratings.houseId.toString())
            if(!house) return res.status(400).send('House not found')
            
            if(house.houseOwnerId.toString() !== req.user._id.toString()) return res.status(401).send("Only House Owner Can Delete")

            await ratings.remove()
            res.status(200).send(ratings)
        } catch (error) {
            res.status(400).send(error)
        }
    })
}
