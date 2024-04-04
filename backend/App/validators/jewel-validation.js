const jewelValidationSchema = {
    // shopId : {
    //     notEmpty : {
    //         errorMessage : '* shopId should not be empty'
    //     },
    //     isMongoId : {
    //         errorMessage : '* Enter valid mongoId'
    //     },
    // },
    ownerId : {
        notEmpty : {
            errorMessage : '* shopId should not be empty'
        },
        isMongoId : {
            errorMessage : '* Enter valid mongoId'
        },
    },
    image : {
        notEmpty : {
            errorMessage : '* image should not be empty'
        },
    },
    price : {
        notEmpty : {
            errorMessage : '* price should not be empty'
        },
        isNumeric : {
            errorMessage: 'price must be numbers'
        }
    },
    caption : {
        notEmpty : {
            errorMessage : '* caption should not be empty'
        }
    }
}

module.exports = jewelValidationSchema