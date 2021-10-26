
const Users = require('../models/usersmodel')
const jwt = require('jsonwebtoken')




//handle error
const handleError = (err)=>{
    console.log(err.message, err.code)
    let errors = {name: '', email: '', password: ''}
    //incorrect email
    if(err.message === 'incorrect email address'){
        errors.email = 'that email is not registered';
    }
     if(err.message === 'incorrect password'){
        errors.password = 'the password you enterred is not correct';
    }
    //validation errors
    // if(err.message.includes('user validation failed')){
    //    Object.values(err.errors).forEach(val=>{
    //        console.log(val.properties.message)
    //    })
    // }
    //dulicate error code
    if(err.code === 11000){
       errors.email = 'that email is already registered'
       return errors
    }
    if(err.message.includes('user validation failed')){
        Object.values(err.errors).forEach(({properties}) =>{
            // console.log(error.properties)
            //we destrcutured the properties above
            console.log(properties)
            //for make the message the value of error declared above
            errors[properties.path] = properties.message
        })
    }
    return errors;
}



//jsonwebtoken handler  
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id)=>{
    return jwt.sign({id}, 'tomiwa secret', {expiresIn: maxAge})

}


//homeroute
const getHomeRoute = (req, res)=>{
    //  Users.find()
    //  .then((users)=>{res.send(users)})
    //     .catch((err)=>{
    //         res.send(err)
    //     }
    // )
    res.render('home')
}

//signup route
const signUp = (req, res)=>{
    res.render('signup')
}

//
const signIn = (req, res)=>{
    res.render('signin')
}

const logout = (req, res)=>{
    res.cookie('jwt', '', {maxAge: 1})
    res.redirect('/')
}






// router.post('/user', (req, res) => {
//     const newUser = req.body
//     data.push(newUser);
//     res.send(`uploaded successfully user ${newUser}`);
// })



//login and signin post

const signUpPost = async (req, res)=> {
    const {name, email, password} = req.body
    try {
        const newUser = await Users.create({name, email, password})
        const token = createToken(newUser._id)
        res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000})
        res.status(201).json({user: newUser._id})
    } catch (error) {
        error = handleError(error)
        res.status(400).json({error})
    }
    // Users.create({name, email, password})
    // .then((user)=>{ 
    //     res.json(user)
    // })
    // .catch((err)=>{
    //     const errors = handleError(err)
    //     res.status(400).json(errors)
    // })
} 
 
const loginPost =  async (req, res)=>{
    const {name, email, password} = req.body
     try{
       const user = await Users.login(name, email, password)
       const token = createToken(user._id)
        res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000})
       res.status(200).json({user: user._id})
     }
     catch(error){
            const errors = handleError(error)
            res.status(400).json({errors})
     }
}


module.exports = {
    getHomeRoute,
    signUp,
    signUpPost,
    loginPost,
    signIn,
    logout
}

