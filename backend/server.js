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
const invoicesCltr=require('./App/controllers/invoice-controller')
const paymentsCntrl = require('./App/controllers/payments-controller')

const {authenticateUser,authorizeUser} = require('./App/middlewares/auth')

const {userRegisterValidationSchema,loginValidationSchema, userOtpValidationSchema} = require('./App/validators/user-validation')
const shopRegisterValidationSchema=require('./App/validators/shop-validation')
const chitRegisterValidationSchema = require('./App/validators/chit-validation')
const customerValidationSchema = require('./App/validators/customer-validation')
const jewelValidationSchema = require('./App/validators/jewel-validation')
const reviewsValidationSchema = require('./App/validators/review-validation')
// const invoicevalidationSchema= require('./App/validators/invoice-validation')

app.use(express.json())
app.use(cors())

const multer = require('multer')


const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        console.log(req.files)
        console.log(file)
      return cb(null, "./public/Images")
    },
    filename: (req, file, cb)=>{
      console.log(file)
      console.log(req.files)
      cb(null, `${Date.now()}-${file.originalname}`)
    }
  })
            
const upload = multer({storage:storage})

//api users
app.post('/api/users/register',checkSchema(userRegisterValidationSchema),usersCltr.register)
app.put('/api/verify/email',checkSchema(userOtpValidationSchema),usersCltr.verifyEmail)
app.get('/api/users/account',authenticateUser,authorizeUser(['admin','owner','customer']),usersCltr.account)
app.post('/api/users/customers',authenticateUser,authorizeUser(['owner']),checkSchema(userRegisterValidationSchema),usersCltr.register)
// app.post('/api/create/customers',authenticateUser,authorizeUser(['owner']),usersCltr.register)
app.post ('/api/login',checkSchema(loginValidationSchema),usersCltr.login)
app.put('/api/update/password',usersCltr.updatePassword)
app.post('/api/forgotpassword',usersCltr.forgotPassword)
app.put('/api/forgotpassword',usersCltr.resetForgotPassword)

//api shops
app.post('/api/shops',authenticateUser,authorizeUser(['owner']),checkSchema(shopRegisterValidationSchema),shopsCltr.register)
app.get('/api/shops',authenticateUser,authorizeUser(['admin']),shopsCltr.getAllshop)
app.get('/api/shops/:ownerId',authenticateUser,authorizeUser(['owner']),shopsCltr.getOneshop)
app.put('/api/shops/:id',authenticateUser,authorizeUser(['owner']),checkSchema(shopRegisterValidationSchema),shopsCltr.update)
app.put('/api/shops/update/:id',authenticateUser,authorizeUser(['admin']),shopsCltr.updateStatus)
app.delete('/api/shops/:id',authenticateUser,authorizeUser(['owner']),shopsCltr.destroy)

//api jewels
app.post('/api/jewels',upload.array('images', 2),jewelsCltr.create)
app.get('/api/jewels',jewelsCltr.get)
app.put('/api/jewels/:id',jewelsCltr.update)
app.delete('/api/jewels/:id',jewelsCltr.delete)

//api chits
app.post('/api/chits',authenticateUser,authorizeUser(['owner']),checkSchema(chitRegisterValidationSchema),chitsCltr.register)
app.put('/api/chits/:id',checkSchema(chitRegisterValidationSchema),chitsCltr.update)
app.get('/api/chits',chitsCltr.getAllchit)
app.get('/api/chits/:id',chitsCltr.getOnechit)
app.delete('/api/chits/:id',chitsCltr.destroy)

//api customers
app.post('/api/customers',authenticateUser,authorizeUser(['owner']),checkSchema(customerValidationSchema),customersCltr.register)
app.get('/api/customers/:ownerId',authenticateUser,authorizeUser(['owner']),customersCltr.list)
app.get('/api/customers/:id',authenticateUser,authorizeUser(['owner']),customersCltr.getOneCustomer)
app.put('/api/customers/:id',authenticateUser,authorizeUser(['owner']),checkSchema(customerValidationSchema),customersCltr.update)
app.delete('/api/customers/:id',authenticateUser,authorizeUser(['owner']),customersCltr.destroy)
//api reviews
app.post ('/api/reviews',reviewsCltr.create)
app.get('/api/reviews',reviewsCltr.list)
app.get('/api/reviews/:id',reviewsCltr.getOneReview)
// app.get('/api/invoices/:id',invoicesCltr.getOneReview)
app.put('/api/reviews/:id',reviewsCltr.update)
app.delete('/api/reviews/:id',reviewsCltr.delete)

app.post ('/api/invoices',authenticateUser,authorizeUser(['owner']),invoicesCltr.create)
app.get('/api/invoices',invoicesCltr.list)
// app.put('/api/invoices/:id',invoicesCltr.update)
app.delete('/api/invoices/:id',invoicesCltr.delete)

// //payments
app.post('/api/create-checkout-session',authenticateUser,authorizeUser(['customer']),paymentsCntrl.pay)
app.get('/api/:shopId/payments',authenticateUser,authorizeUser(['owner']),paymentsCntrl.list)
app.get('/api/:shopId/payments/:paymentId',authenticateUser,authorizeUser(['owner']),paymentsCntrl.listOne)
app.put('/api/payment/status/update/:id' , paymentsCntrl.successUpdate)
app.put('/api/payment/failer/:id',paymentsCntrl.failureUpdate)
app.listen(port,()=>{
    console.log(`ChitGem-app is successfully running on the ${port}`)
})