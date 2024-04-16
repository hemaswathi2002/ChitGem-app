const User = require('../models/user-model')
const userRegisterValidationSchema = {

    username : {
        notEmpty : {
            errorMessage : 'username should not be empty'
        },
        trim : true
    },
    email : {
        notEmpty : {
            errorMessage : 'email should not be empty'
        },
        isEmail : {
            errorMessage : 'email must be in email format'
        },
        custom : {
            options : async function(value){
                const user = await User.findOne({email:value})
                if(!user){
                    return true
                }else {
                    throw new Error ('Email already exists!')
                }
            }
        },normalizeEmail : true,trim : true
    },
    mobile : {
        notEmpty : {
            errorMessage : 'mobile should not be empty'
        },
        isNumeric : {
            errorMessage : 'mobile should be a number type'
        },
        isLength : {
            options : {min:10,max:10},
            errorMessage : 'mobile number should have 10 digits'
        },
        custom : {
            options : async function (value) {
                const user = await User.findOne({mobile:value})
                if(!user){
                    return true
                }else{
                    throw new Error('number already exists')
                }
            }
        } , 
        trim : true
    },
    password : {
        notEmpty : {
            errorMessage : 'password should not be empty'
        },
        isStrongPassword : {
            minLength : 8,
            minLowerCase : 1,
            minUpperCase : 1,
            minSymbols : 1,
            minNumber : 1,
            errorMessage : 'Password must containt atleast 1-uppercase, 1-lowercase, 1-number, 1-symbols'
        }
    }
    }

const loginValidationSchema = {
    email : {
        notEmpty : {
            errorMessage : 'email is required'
        },
        trim : true
    },
    password : {
        notEmpty :{
            errorMessage : 'password is required'
        },
        trim : true

    },
}

const userOtpValidationSchema={
    email:{
        notEmpty:{
            errorMessage:"email is required"
        },
        trim:true,
        normalizeEmail:true,
        isEmail:{
            errorMessage:"enter valid email"
        }
    },
    otp:{
        notEmpty:{
            errorMessage:"otp is required"
        },
        isLength:{
            options:{min:4,max:4},
            errorMessage:"length should 4 digits"
        }

    }
}


module.exports = {
    userRegisterValidationSchema: userRegisterValidationSchema,
    loginValidationSchema : loginValidationSchema,
    userOtpValidationSchema : userOtpValidationSchema
}