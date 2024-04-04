const Shop = require("../models/wishlist-model")

const wishlistValidationSchema = {
    customerId : {
        notEmpty : {
            errorMessage : '* ownerId should not be empty'
        },
        isMongoId : {
            errorMessage : '* Enter valid mongoId'
        }
    },
    shopId:{
        notEmpty:{
            errorMessage:'* shopId should not be empty'
        },
        isMongoId:{
            errorMessage:'* Enter a valid mongoId'
        }
    },
    jewelId:{
        notEmpty:{
            errorMessage:'* jewel should not be empty'
        },
        isMongoId:{
            errorMessage:'* Enter a valid mongoId'
        }
    }
}
module.exports=wishlistValidationSchema