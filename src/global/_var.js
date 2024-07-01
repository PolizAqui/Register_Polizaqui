require('dotenv').config()

/***** Server *****/

const PORT   =   process.env.PORT

/******  DATABASE *****/

const PG_USER  =  process.env._USER
const PG_PASS  =  process.env._PASS
const PG_HOST  =  process.env._HOST
const PG_NAME  =  process.env._NAME

/****** KEY *****/

const KEY      =  process.env.KEY

/******* USERS ROUTES ******/

const REGISTER =  process.env.REGISTER


module.exports = {
    //Server
    PORT,
    //DATABASE
    PG_HOST,
    PG_NAME,
    PG_PASS,
    PG_USER,
    //KEY
    KEY,
    //ROUTES
    REGISTER
}