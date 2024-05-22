require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const {checkSchema} = require('express-validator')
const port = 3009

const configureDB = require('./config/db')
configureDB()
const Wishlistcltr = require('./App/controllers/wishlists-controller')

const usersCltr = require('./App/controllers/users-controller')
const shopsCltr=require('./App/controllers/shops-controller')
const jewelsCltr = require('./App/controllers/jewels-controller')
const chitsCltr=require('./App/controllers/chits-controller')
const customersCltr = require('./App/controllers/customers-controller')
const reviewsCltr = require('./App/controllers/reviews-controller')
const invoicesCltr=require('./App/controllers/invoice-controller')
const paymentsCntrl = require('./App/controllers/payments-controller')
const {authenticateUser,authorizeUser} = require('./App/middlewares/auth')
const goldCltr=require('./App/controllers/gold-controlller')
const {userRegisterValidationSchema,loginValidationSchema, userOtpValidationSchema} = require('./App/validators/user-validation')
const shopRegisterValidationSchema=require('./App/validators/shop-validation')
const chitRegisterValidationSchema = require('./App/validators/chit-validation')
const customerValidationSchema = require('./App/validators/customer-validation')
const jewelValidationSchema = require('./App/validators/jewel-validation')
const reviewsValidationSchema = require('./App/validators/review-validation')
const invoicevalidationSchema= require('./App/validators/invoice-validation')

app.use(express.json())
app.use(cors())

const multer = require('multer')


app.use('/uploads',express.static('uploads'))
 const storage=multer.diskStorage(
   {
       destination:function (req,file,cb){
           return cb(null,"./uploads")
       },
       filename:function(req,file,cb){
           return cb(null,`${Date.now()}-${file.originalname}`)
       }
   }
)
const upload=multer({storage})
            

//api users
app.post('/api/users/register',checkSchema(userRegisterValidationSchema),usersCltr.register)
app.put('/api/verify/email',checkSchema(userOtpValidationSchema),usersCltr.verifyEmail)
app.get('/api/users/account',authenticateUser,authorizeUser(['admin','owner','customer']),usersCltr.account)
app.post ('/api/login',checkSchema(loginValidationSchema),usersCltr.login)
app.put('/api/update/password',usersCltr.updatePassword)
app.post('/api/users/forgotpassword',usersCltr.forgotPassword)
app.put('/api/users/setforgotpassword',usersCltr.resetForgotPassword)

//api shops
app.post('/api/shops',authenticateUser,authorizeUser(['owner']),checkSchema(shopRegisterValidationSchema),shopsCltr.register)
app.get('/api/shops',authenticateUser,authorizeUser(['admin']),shopsCltr.getAllshop)
app.get('/api/shops/:ownerId',authenticateUser,authorizeUser(['owner']),shopsCltr.getOneshop)
app.put('/api/shops/:id',authenticateUser,authorizeUser(['owner']),checkSchema(shopRegisterValidationSchema),shopsCltr.update)
app.put('/api/shops/update/:id',authenticateUser,authorizeUser(['admin']),shopsCltr.updateStatus)
app.delete('/api/shops/:id',authenticateUser,authorizeUser(['owner']),shopsCltr.destroy)
app.get('/api/shop/approved-status',shopsCltr.getAllApprovedShops)

//api jewels
app.post('/api/jewels', upload.single('images'),authenticateUser,authorizeUser(['owner']),jewelsCltr.create)
app.get('/api/jewels',jewelsCltr.get)
// app.get('/api/jewels/all',authenticateUser,authorizeUser(['customer']),jewelsCltr.get)
app.put('/api/jewels/:id',authenticateUser,authorizeUser(['owner']),jewelsCltr.update)
app.delete('/api/jewels/:id',authenticateUser,authorizeUser(['owner']),jewelsCltr.delete)


//wishlist
app.post('/api/wishlists',authenticateUser,authorizeUser(['owner','customer']),Wishlistcltr.create) 
app.get('/api/wishlists/:userId', authenticateUser, authorizeUser(['owner', 'customer']), Wishlistcltr.list);
app.delete('/api/wishlists',authenticateUser,authorizeUser(['owner','customer']),Wishlistcltr.destroy)

//api chits
app.post('/api/chits',authenticateUser,authorizeUser(['owner']),checkSchema(chitRegisterValidationSchema),chitsCltr.register)
app.put('/api/chits/:id',checkSchema(chitRegisterValidationSchema),chitsCltr.update)
// app.get('/api/chits',chitsCltr.getAllchit)
app.get('/api/customers/:id/chits',authenticateUser,authorizeUser(['owner']),chitsCltr.getCustomersChit)
app.get('/api/chits/:id',authenticateUser,authorizeUser(['owner']),chitsCltr.getOnechit)
app.get('/api/user/chits',authenticateUser,authorizeUser(['customer']),chitsCltr.getUsersChit)
app.delete('/api/chits/:id',chitsCltr.destroy)

//api customers
app.post('/api/customers',authenticateUser,authorizeUser(['owner']),checkSchema(customerValidationSchema),customersCltr.register)
app.get('/api/customers/:ownerId',authenticateUser,authorizeUser(['owner']),customersCltr.list)
app.get('/api/customers',authenticateUser,authorizeUser(['customer']),customersCltr.getOneCustomer) // getusercustomerDetails
app.put('/api/customers/:id',authenticateUser,authorizeUser(['owner','customer']),checkSchema(customerValidationSchema),customersCltr.update)
app.delete('/api/customers/:id',authenticateUser,authorizeUser(['owner']),customersCltr.destroy)
//api reviews
app.post ('/api/reviews',reviewsCltr.create)
app.get('/api/reviews',reviewsCltr.list)
app.get('/api/reviews/:id',reviewsCltr.getOneReview)
// app.get('/api/invoices/:id',invoicesCltr.getOneReview)
app.put('/api/reviews/:id',reviewsCltr.update)
app.delete('/api/reviews/:id',reviewsCltr.delete)

//gold price
app.get('/api/goldprice',goldCltr.get)

//invoice
app.get('/api/gold-price',invoicesCltr.get)
app.get('/api/chits/:chitId/invoices',authenticateUser,authorizeUser(['owner']),invoicesCltr.list)
app.get('/api/invoices/users',authenticateUser,authorizeUser(['owner','customer']),invoicesCltr.listOneCustomer)
app.put('/api/invoices/:id',authenticateUser,authorizeUser(['customer']),invoicesCltr.update)
app.delete('/api/invoices/:id',invoicesCltr.delete)

// //payments
app.post('/api/create-checkout-session',authenticateUser,authorizeUser(['customer']),paymentsCntrl.pay)
app.get('/api/payments',authenticateUser,authorizeUser(['customer','owner']),paymentsCntrl.list)
app.get('/api/payments/:id/pdf', paymentsCntrl.generatePdf)
app.get('/api/payments/owner',authenticateUser,authorizeUser(['owner']),paymentsCntrl.listAll)
app.get('/api/payments/chits/:chitId',authenticateUser,authorizeUser(['owner']),paymentsCntrl.listOneChit)
app.put('/api/payments/status/update/:id', paymentsCntrl.successUpdate)
// app.put('/api/payment/status/update/:id',paymentsCntrl.failureUpdate)
app.listen(port,()=>{
    console.log(`ChitGem-app is successfully running on the ${port}`)
})