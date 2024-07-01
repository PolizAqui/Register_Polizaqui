const { REGISTER } = require('../global/_var.js')

/****** DEPENDENCY ******/

const express = require('express')
const router  = express.Router()

/****** CONTROLLER ******/

const saveInfoController = require('../controllers/saveInfo.controller.js')


/****** ROUTES ******/

router.post(REGISTER, saveInfoController.saveUser)




module.exports = router