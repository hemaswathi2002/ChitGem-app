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

module.exports=wishlistValidationSchema