
const Wishlist=require('../models/wishlist-model')

const wishlistValidationSchema={
    // customerId:{
    //     notEmpty:{
    //         errorMessage:'* CustomerId is required'
    //     },
    //     isMongoId:{
    //         errorMessage:'* Enter a valid MongoId'
    //     }
    // },
    shopId:{
        notEmpty:{
            errorMessage:'* ShopId is required'
        },
        isMongoId:{
            errorMessage:'* Enter a valid MongoId'
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
            errorMessage:'* jewelId is required'
        },
        isMongoId:{
            errorMessage:'* Enter a valid MongoId'
        }
    }
}

            errorMessage:'* jewel should not be empty'
        },
        isMongoId:{
            errorMessage:'* Enter a valid mongoId'
        }
    }
}

module.exports=wishlistValidationSchema