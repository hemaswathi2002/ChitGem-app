require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const {checkSchema} = require('express-validator')
const port = 3009

const configureDB = require('./config/db')
configureDB()

const usersCltr = require('./App/controllers/users-controller')
const shopsCltr=require('./App/controllers/shops-controller')

const wishlistCltr = require('./App/controllers/wishlist-controller')

const {authenticateUser,authorizeUser} = require('./App/middlewares/auth')

const {userRegisterValidationSchema,loginValidationSchema} = require('./App/validations/user-validation')
const shopRegisterValidationSchema=require('./App/validations/shop-validation')
const wishlistValidationSchema=require('./App/validations/wishlist-validation')
app.use(express.json())
app.use(cors())

app.post('/api/users',checkSchema(userRegisterValidationSchema),usersCltr.register)
app.post ('/api/login',authenticateUser,checkSchema(loginValidationSchema),usersCltr.login)
app.get('/api/account',authenticateUser,usersCltr.account)

app.post('/api/shops',authenticateUser,checkSchema(shopRegisterValidationSchema),shopsCltr.register)
app.put('/api/shops/:id',authenticateUser,checkSchema(shopRegisterValidationSchema),shopsCltr.update)
app.get('/api/shops',authenticateUser,shopsCltr.getAllshop)
app.get('/api/shops/:id',authenticateUser,shopsCltr.getOneshop)
app.delete('/api/shops/:id',authenticateUser,shopsCltr.destroy)

app.post('/api/wishlists',authenticateUser,checkSchema(wishlistValidationSchema),wishlistCltr.create)
app.put('/api/wishlists/:id',checkSchema(wishlistValidationSchema),wishlistCltr.update)
app.get('/api/wishlists',authenticateUser,wishlistCltr.getAllWishlist)
app.get('/api/wishlists/:id',authenticateUser,wishlistCltr.getOneWishlist)
app.delete('/api/wishlists/:id',authenticateUser,wishlistCltr.destroy)


app.listen(port,()=>{
    console.log(`ChitGem-app is successfully running on the ${port}`)
})