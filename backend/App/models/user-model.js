const mongoose = require('mongoose')
const {Schema,model} = mongoose

const userSchema = new Schema({
    username : String,
    email : String,
    mobile : Number,
    role : {
        type : String,
        enum : ['admin','owner','customer']
    },
    password : String
},{timestamps:true})

const User = model('User',userSchema)

module.exports = User