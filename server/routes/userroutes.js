const express = require('express')
const userrouter = express.Router()
const usercontroller = require('../controller/usercontroller.js')


userrouter.post('/register',usercontroller.registercontroller)
userrouter.post('/login',usercontroller.logincontroller)
// userrouter.get('/logout',usercontroller.logoutcontroller)



module.exports = userrouter