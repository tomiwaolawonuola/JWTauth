
const jwt = require('jsonwebtoken');
const Users = require('../models/usersmodel');

const requireAuth = (req, res, next)=>{
    const token = req.cookies.jwt;
    
    //check json web token exists
    if(token){
       jwt.verify(token, 'tomiwa secret', (err, decodedToken)=>{
         if(err){
             console.log(err.message);
             res.redirect('/signin')
         } else {
             console.log(decodedToken)
                next();
         }
       })
    }
    else{
        res.redirect('/signin');
    }
}

//check current user 

const checkUser = (req, res, next)=>{
    const token = req.cookies.jwt;
    if(token){
        jwt.verify(token, 'tomiwa secret', async (err, decodedToken)=>{
            if(err){
                console.log(err.message)
                res.locals.user = null
                next()
            }else{
                console.log(decodedToken)
                let user = await Users.findById(decodedToken.id)
                res.locals.user = user
                next()
            }
        })
    }
    else{
        res.locals.user = null
        next()
    }
}





module.exports = {requireAuth, checkUser}