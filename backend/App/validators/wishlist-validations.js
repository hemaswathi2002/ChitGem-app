const Wishlist = require("../models/wishlists-model")

const wishValidationSchema = {
    shopId : {
    notEmpty : {
      errorMessage : '* shopId should not be empty'
    },
    isMongoId : {
      errorMessage : '* Enter valid mongoId'
    }
  },
  jewelId : {
    notEmpty : {
      errorMessage : '* jewelId should not be empty'
    },
    isMongoId : {
      errorMessage : '* Enter valid mongoId'
    }
  },
  customerId : {
    notEmpty : {
      errorMessage : '* jewelId should not be empty'
    },
    isMongoId : {
      errorMessage : '* Enter valid mongoId'
    }
  },
}
module.exports = wishValidationSchema