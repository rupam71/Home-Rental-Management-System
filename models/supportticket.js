const mongoose = require('mongoose')

const supportTicketSchema = new mongoose.Schema({
    creatorId : {
        type: String,
        required: true,
        trim:true
    },
    creatorName : {
        type: String,
        required: true,
        trim:true
    },
    subject : {
        type: String,
        required: true,
        trim:true
    },
    description : {
        type: String,
        required: true,
        trim:true
    },
    status : {
        type: String,
        default: 'sent',
        trim:true,
        validate(value) {
            if(value !== "sent" && value !== "viewed") throw new Error (`Status must be either "Sent" or "Viewed".`)
        }
    }
})

const SupportTicket = mongoose.model('supportTicket',supportTicketSchema)
module.exports = SupportTicket