const User = require('../models/user-model')

const userRegisterValidationSchema = {
    username:{
        notEmpty:{
            errorMessage: 'username should not be empty'
        },
    trim:true
    },
    email:{
        notEmpty:{
            errorMessage : "email should not be empty"
        },
        isEmail:{
            errorMessage : 'email must be in email format'
        },
        custom : {
            options : (async(value)=>{
                const user = await User.findOne({email:value})
                if(!user){
                    return true
                }else{
                    throw new Error('email already exists')
                }
            })
        },normalizeEmail : true
    },
    role : {
        notEmpty: {
            errorMessage : 'role should not be empty'
        },trim: true
    },
    password : {
        notEmpty : {
            errorMessage : 'password should not be empty'
        },
        isStrongPassword:{
            minLength:8,
            minLowerCase:1,
            minUpperCase:1,
            minNumber:1,
            minSymbols:1,
            errorMessage:'Password must containt atleast 1-uppercase, 1-lowercase, 1-number, 1-symbols'
        },escape:true
    }
}

const loginValidationSchema = {
    email : {
        notEmpty : {
            errorMessage : 'email is required'
        },trim : true
    },
    password : {
        notEmpty : {
            errorMessage : 'password is required'
        },trim : true
    }
}
module.exports = {userRegisterValidationSchema,loginValidationSchema}