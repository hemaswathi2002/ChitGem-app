const customerValidationSchema = {
    username : {
        notEmpty : {
            errorMessage : "* username is required"
        },
        trim : true
    },
    "contact.email" : {
        notEmpty : {
            errorMessage : "* email is required"
        },
        isEmail : {
            errorMessage : "* email must be in email format"
        }, 
        normalizeEmail : true, trim : true
    },
    "contact.mobile" : {
        notEmpty : {
            errorMessage : "* mobile is required"
        },
        isNumeric : {
            errorMessage : "* mobile must contain only numbers"
        },
        isLength : {
            options : {min : 10, max:10},
            errorMessage : "* mobile must containe 10 digits"
        },
        trim : true
    },
    // ownerId : {
    //     notEmpty : {
    //         errorMessage : "* ownerId is required"
    //     },
    //     isMongoId : {
    //         errorMessage : "* enter valid mongoId"
    //     },
    //     trim : true
    // },
    // shopId:{
    //     notEmpty : {
    //         errorMessage : "* shopId is required"
    //     },
    //     isMongoId : {
    //         errorMessage : "* enter valid mongoId"
    //     },
    //     trim : true
    // }
    // goldHarvested : {
    //     notEmpty : {
    //         errorMessage : "*"
    //     }
    // }

}

module.exports = customerValidationSchema