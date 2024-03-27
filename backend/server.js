require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const {checkSchema} = require('express-validator')
const port = 3089

const configureDB = require('./config/db')
configureDB()

const usersCltr = require('./App/controllers/users-controller')
const shopsCltr=require('./App/controllers/shops-controller')
const {userRegisterValidationSchema,loginValidationSchema} = require('./App/validations/user-validation')

const shopRegisterValidationSchema=require('./App/validations/shop-validation')
app.use(express.json())
app.use(cors())

app.post('/users',checkSchema(userRegisterValidationSchema),usersCltr.register)
app.post ('/users/login',checkSchema(loginValidationSchema),usersCltr.login)
app.get('/users/account',usersCltr.account)
app.post('/api/shops',checkSchema(shopRegisterValidationSchema),shopsCltr.register)
app.put('/api/shops/:id',checkSchema(shopRegisterValidationSchema),shopsCltr.update)
app.get('/api/shops',shopsCltr.getAllshop)
app.get('/api/shops/:id',shopsCltr.getOneshop)
app.delete('/api/shops/:id',shopsCltr.destory)

const {authenticateUser,authorizeUser} = require('./App/middlewares/auth')

app.use(express.json())
app.use(cors())

app.post('/api/users',checkSchema(userRegisterValidationSchema),usersCltr.register)
app.post ('/api/users/login',checkSchema(loginValidationSchema),usersCltr.login)

app.get('/api/account',authenticateUser,usersCltr.account)


app.listen(port,()=>{
    console.log(`ChitGem-app is successfully running on the ${port}`)
})