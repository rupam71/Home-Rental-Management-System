const auth = require("../middleware/auth")
const admin = require("../middleware/admin")
const SupportTicket = require("../models/supportticket")

module.exports = (app) => {
    // create ticket //DONE
    app.post('/api/supportticket', auth, async(req,res)=>{
        const supportTicket = new SupportTicket({
            creatorId: req.user._id,
            creatorName: req.user.name,
            ...req.body
        })
        
        try{
            await supportTicket.save()
            res.status(200).send(supportTicket)
        } catch(e) {
            res.status(400).send(Object.entries(e.errors)[0][1].message);
        }
    })  

    //View one user all ticket //DONE
    app.get('/api/supportticket/user/:id', auth, async (req,res)=>{
        const supportTicket =  await SupportTicket.find({creatorId:req.params.id})
        if(!supportTicket) return res.status(400).send('Not A Single Ticket Created Yet')
        
        try {
            res.send(supportTicket)
        } catch (error) {
            res.status(400).send(error)
        }
    })

    // view own ticket by id 
    app.get('/api/supportticket/ticket/:id', auth, async (req,res)=>{
        const supportTicket =  await SupportTicket.findById(req.params.id)
        if(!supportTicket) return res.status(400).send('Support Ticket Not Found')
        
        if(supportTicket.creatorId.toString() !== req.user._id.toString()) return res.status(401).send("Only creator can view Own Support Ticket")
        try {
            res.send(supportTicket)
        } catch (error) {
            res.status(400).send(error)
        }
    })

    // Admin can view support ticket by id
    app.get('/api/supportticket/a/:id', admin, async (req,res)=>{
        const supportTicket =  await SupportTicket.findById(req.params.id)
        if(!supportTicket) return res.status(400).send('Support Ticket Not Found')
        
        supportTicket.status = "viewed"

        try {
            await supportTicket.save()
            res.status(200).send(supportTicket)
        } catch (error) {
            res.status(400).send(error)
        }
    })

    // Admin can view support ticket list
    app.get('/api/supportticket', admin, async (req,res)=>{
        const supportTicket =  await SupportTicket.find({})

        try {
            res.status(200).send(supportTicket)
        } catch (error) {
            res.status(400).send(error)
        }
    })
}