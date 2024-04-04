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

const {authenticateUser,authorizeUser} = require('./App/middlewares/auth')

const {userRegisterValidationSchema,loginValidationSchema} = require('./App/validators/user-validation')
const shopRegisterValidationSchema=require('./App/validators/shop-validation')
const chitRegisterValidationSchema = require('./App/validators/chit-validation')
const customerValidationSchema = require('./App/validators/customer-validation')

const customersCltr = require('./App/controllers/customers-controller')


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


app.post('/api/users',checkSchema(userRegisterValidationSchema),usersCltr.register)
app.post ('/api/login',checkSchema(loginValidationSchema),usersCltr.login)
app.get('/api/account',authenticateUser,usersCltr.account)

app.post('/api/shops',authenticateUser,checkSchema(shopRegisterValidationSchema),shopsCltr.register)
app.put('/api/shops/:id',authenticateUser,checkSchema(shopRegisterValidationSchema),shopsCltr.update)
app.get('/api/shops',authenticateUser,shopsCltr.getAllshop)
app.get('/api/shops/:id',authenticateUser,shopsCltr.getOneshop)
app.delete('/api/shops/:id',authenticateUser,shopsCltr.destroy)

app.post('/api/jewels',upload.array('images', 2),jewelsCltr.create)

app.get('/api/jewels',jewelsCltr.get)
app.put('/api/jewels/:id',jewelsCltr.update)
app.delete('/api/jewels/:id',jewelsCltr.delete)




app.post('/api/chits',authenticateUser,checkSchema(chitRegisterValidationSchema),chitsCltr.register)
app.put('/api/chits/:id',authenticateUser,checkSchema(chitRegisterValidationSchema),chitsCltr.update)
app.get('/api/chits',authenticateUser,chitsCltr.getAllchit)
app.get('/api/chits/:id',authenticateUser,chitsCltr.getOnechit)
app.delete('/api/chits/:id',authenticateUser,chitsCltr.destroy)

app.post('/api/customers',authenticateUser,authorizeUser(['owner']),checkSchema(customerValidationSchema),customersCltr.create)
app.get('/api/customers',customersCltr.list)
app.get('/api/customers/:id',customersCltr.getOneCustomer)
app.put('/api/customers/:id',checkSchema(customerValidationSchema),customersCltr.update)
app.delete('/api/customers/:id',customersCltr.destroy)


app.listen(port,()=>{
    console.log(`ChitGem-app is successfully running on the ${port}`)
})