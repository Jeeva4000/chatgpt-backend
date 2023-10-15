const express = require('express')
const { registerController, loginController, logoutController } = require('../controllers/authController')

//roter object
const router = express.Router()



//rotes
//REGISTER
router.post("/register", registerController)

//LOGIN
router.post("/login", loginController)

//LOGOUT
router.post("/logout", logoutController)



module.exports = router