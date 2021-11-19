const express = require('express')
const database = require('./database/db')
const app = express() 

database();

app.use(express.json({extended:false}))

require('./router/user')(app)
require('./router/rent')(app)
require('./router/house')(app)
require('./router/ratings')(app)
require('./router/supportticket')(app)

if(process.env.NODE_ENV === 'production') {
    // express will serve up production assests
    // like our main.js or main.css file
    app.use(express.static('client/build'))


    // Express will serve up the indexe.html file
    // if it doesn't recognize the route
    const path = require('path');
    app.get('*', (req,res)=>{
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}

const PORT = process.env.PORT || 5000
app.listen(PORT)
console.log(`Listening at port : ${PORT}`)