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

const usersForgotPasswordSchema={
    email:{
        errorMessage:"mail is required"
    },
    trim:true,
    normalizeEmail:true,
    isEmail:{
        errorMessage:"require valide email format"
    },
}

const usersSetPasswordSchema={
    email:{
        notEmpty:{
            errorMessage:"email require"
        },
        trim:true,
        normalizeEmail:true,
        isEmail:{
            errorMessage:"should be valide email"
        }
    },
    password:{
        notEmpty:{
            errorMessage:"paasowrd is require"
        },
        isStrongPassword:{
            options:[{ minLowercase: 1,
              minUppercase: 1,minNumbers:2,minSymbols:1}],
              errorMessage:"password must contain 2 uppercase 2 lower case 2 min numbersand atleast one symbol"
          },
          isLength:{
              options:[{min:5,max:128}],
              errorMessage:"password length must be in between 5 to 128 long "
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
 const userOtpValidation={
    email:{
        notEmpty:{
            errorMessage:"email require"
        },
        trim:true,
        normalizeEmail:true,
        isEmail:{
            errorMessage:"should be valide email"
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

const usersupdatePasswordValidationSchema={
    oldPassword:{
        notEmpty:{
            errorMessage:"old password is required"
        },
    },
    newPassword:{
        notEmpty:{
            errorMessage:"paasowrd is require"
        },
        isStrongPassword:{
            options:[{ minLowercase: 1,
              minUppercase: 1,minNumbers:2,minSymbols:1}],
              errorMessage:"password must contain 2 uppercase 2 lower case 2 min numbersand atleast one symbol"
          },
          isLength:{
              options:[{min:5,max:128}],
              errorMessage:"password length must be in between 5 to 128 long "
          }
    },
    changePassword:{
        notEmpty:{
            errorMessage:"paasowrd is require"
        },
        isStrongPassword:{
            options:[{ minLowercase: 1,
              minUppercase: 1,minNumbers:2,minSymbols:1}],
              errorMessage:"password must contain 2 uppercase 2 lower case 2 min numbersand atleast one symbol"
          },
          isLength:{
              options:[{min:5,max:128}],
              errorMessage:"password length must be in between 5 to 128 long "
          }
    }
    }


module.exports = {
    userRegisterValidationSchema: userRegisterValidationSchema,
    loginValidationSchema : loginValidationSchema,
    userOtpValidationSchema : userOtpValidationSchema,
    userOtpValidation,
    usersForgotPasswordSchema,
    usersSetPasswordSchema,
    usersupdatePasswordValidationSchema

}