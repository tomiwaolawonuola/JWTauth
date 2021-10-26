const express = require('express')

const router = express.Router()

const controllers = require('../controllers/controller')



//renders
router.get('/', controllers.getHomeRoute)
router.get('/signup',controllers.signUp)
router.get('/signin', controllers.signIn)
router.get('/logout', controllers.logout)


//signUp and login Post in APIs
router.post('/signup/post', controllers.signUpPost)
router.post('/signin/post', controllers.loginPost)


 

module.exports = router