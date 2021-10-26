const express = require('express');
const cookieParser = require('cookie-parser')
const app = express();
const mongoose = require('mongoose');
const routes = require('./routes/routes')
const {requireAuth, checkUser} = require('./middleware/authmiddleware')

// const cors = require('cors')
const PORT = process.env.PORT || 5000;

const URLDB = 'mongodb+srv://userAuth:test123@cluster0.dey31.mongodb.net/userAuth?retryWrites=true&w=majority'
mongoose.connect(URLDB, {useNewUrlParser: true, useUnifiedTopology: true})
.then(result => {
    
    console.log(`connected to db ${mongoose.connection.host}`)
    app.listen(PORT, ()=>{
    console.log(`Server listening on port ${PORT}`)
    })

   
})

.catch(err =>{
    console.log(err)
})





//cookie passer middleware
app.use(cookieParser())

//dashboardRoute
//the "*" means apply to every single get request //route
app.get('*', checkUser)
app.get('/dashboard', requireAuth, (req, res)=>{
   res.render('dashboard')
})






//middleware 
app.use(express.static('public'))
app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(routes)




//making cookies work
//first we set it and read it
//cookies help us to store info on the client side
//and the server can read it
//to make it eaaasy we use the cookie-parser
//the cookie-parser is a middleware

// function validateCookie (req, res, next){
//     const {cookies} = req
//     console.log(cookies)
    
//     next()
// }

// //set cookie
// app.get('/set-cookies', validateCookie, (req, res)=>{
//     res.cookie('session_id', '123456')
//     res.status(200).json({msg: 'Logged In'})
// })







//read-cookies
// app.get('/read-cookies', (req, res)=>{
    
// })
















