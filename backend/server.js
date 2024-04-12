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
const jewelsCltr = require('./App/controllers/jewels-controller')
const chitsCltr=require('./App/controllers/chits-controller')
const customersCltr = require('./App/controllers/customers-controller')
const reviewsCltr = require('./App/controllers/reviews-controller')


const {authenticateUser,authorizeUser} = require('./App/middlewares/auth')

const {userRegisterValidationSchema,loginValidationSchema} = require('./App/validators/user-validation')
const shopRegisterValidationSchema=require('./App/validators/shop-validation')
const chitRegisterValidationSchema = require('./App/validators/chit-validation')
const customerValidationSchema = require('./App/validators/customer-validation')
const jewelValidationSchema = require('./App/validators/jewel-validation')
const reviewsValidationSchema = require('./App/validators/review-validation')



app.use(express.json())
app.use(cors())

const multer = require('multer')


const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        console.log(req.files)
        console.log(file)
      return cb(null, "./public/Images");
    },
    filename: (req, file, cb)=>{
      console.log(file);
      console.log(req.files)
      cb(null, `${Date.now()}-${file.originalname}`)
    }
  });
  
const upload = multer({storage:storage})

//api users
app.post('/api/users',checkSchema(userRegisterValidationSchema),usersCltr.register)
app.post('/api/users/customers',authenticateUser,authorizeUser(['owner']),checkSchema(userRegisterValidationSchema),usersCltr.register)
// app.post('/api/create/customers',authenticateUser,authorizeUser(['owner']),usersCltr.register)
app.post ('/api/login',checkSchema(loginValidationSchema),usersCltr.login)
app.get('/api/account',authenticateUser,authorizeUser(['admin','owner','customer']),usersCltr.account)

//api shops
app.post('/api/shops',authenticateUser,authorizeUser(['owner']),checkSchema(shopRegisterValidationSchema),shopsCltr.register)
app.get('/api/shops',authenticateUser,authorizeUser(['owner']),shopsCltr.getAllshop)
app.get('/api/shops/:id',authenticateUser,authorizeUser(['admin','owner','customer']),shopsCltr.getOneshop)
app.put('/api/shops/:id',authenticateUser,authorizeUser(['owner']),checkSchema(shopRegisterValidationSchema),shopsCltr.update)
app.put('/api/shops/update/:id',authenticateUser,authorizeUser(['admin']),checkSchema(shopRegisterValidationSchema),shopsCltr.updateStatus)
app.delete('/api/shops/:id',authenticateUser,shopsCltr.destroy)

//api jewels
app.post('/api/jewels',authenticateUser,authorizeUser(['owner']),upload.array('images', 2),jewelsCltr.create)
app.get('/api/jewels',authenticateUser,authorizeUser(['owner','customer','admin']),jewelsCltr.get)
app.put('/api/jewels/:id',authenticateUser,authorizeUser(['owner']),jewelsCltr.update)
app.delete('/api/jewels/:id',authenticateUser,authorizeUser(['owner']),jewelsCltr.delete)

//api chits
app.post('/api/chits',authenticateUser,checkSchema(chitRegisterValidationSchema),chitsCltr.register)
app.put('/api/chits/:id',authenticateUser,checkSchema(chitRegisterValidationSchema),chitsCltr.update)
app.get('/api/chits',authenticateUser,chitsCltr.getAllchit)
app.get('/api/chits/:id',authenticateUser,chitsCltr.getOnechit)
app.delete('/api/chits/:id',authenticateUser,chitsCltr.destroy)

//api customers
app.post('/api/:customerId',authenticateUser,authorizeUser(['owner']),checkSchema(customerValidationSchema),customersCltr.register)
app.get('/api/customers',authenticateUser,authorizeUser(['owner']),customersCltr.list)
app.get('/api/customers/:id',authenticateUser,authorizeUser(['owner','customer']),customersCltr.getOneCustomer)
app.put('/api/customers/:id',authenticateUser,authorizeUser(['owner']),checkSchema(customerValidationSchema),customersCltr.update)
app.delete('/api/customers/:id',customersCltr.destroy)

//api reviews
app.post ('/api/reviews',authenticateUser,authorizeUser(['customer']),checkSchema(reviewsValidationSchema),reviewsCltr.create)
app.get('/api/reviews',reviewsCltr.list)
app.get('/api/reviews/:id',authenticateUser,authorizeUser(['customer','owner']),reviewsCltr.getOneReview)
app.put('/api/reviews/:id',authenticateUser,authorizeUser(['customer']),checkSchema(reviewsValidationSchema),reviewsCltr.update)
app.delete('/api/reviews/:id',authenticateUser,authorizeUser(['customer']),reviewsCltr.delete)


app.listen(port,()=>{
    console.log(`ChitGem-app is successfully running on the ${port}`)
})