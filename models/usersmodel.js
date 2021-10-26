
const mongoose = require('mongoose')
const {isEmail} = require('validator')
const bcrypt = require('bcrypt')


const userSchema = new mongoose.Schema ({
        name: {
            type: String,
            required: [true, 'Name is required'],
        },

        email:{
            type: String,
            required: [true, 'please enter an email'],
            unique: true,
            lowercase: true,
            validate: [isEmail, 'Please enter a valid email']
        },

        password: {
            type: String,
            required: [true, 'Please enter a password'],
            minlength: [6, 'Minimum length is 6 characters']
        }

})



//HASHING PASSWORD
//mongoose hook
//a mongoose hook is a function that firesup after a certain mongoose event happens
//fire a function before it doc get to db
 //we get access to the doc before it saved here
     //we are also using function because it will allow us use the "this" keyword
userSchema.pre('save', async function (next){
    // console.log('user about to be created and saved', "this" refers to the user we are creating)
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, salt)
    next()
})


//to fire a function after a doc is saved to db
// userSchema.post('save', function(doc, next){
//     console.log('new user was created and saved', doc)
//     next()
// })

//hANDLE SIGIN BY COMPARING, NAME, EMAIL AND PASSWORD
//we create a static method to login in a user
userSchema.statics.login  = async function (name, email, password) {
    const user = await this.findOne({name, email})
    if(user){
     const auth = await  bcrypt.compare(password, user.password)
     if(auth){
        return user 
     }else{
         throw Error('incorrect password')
     }   
    }

    else{
        throw Error('incorrect email address')
    }
}




const Users = mongoose.model('user', userSchema)

module.exports = Users
