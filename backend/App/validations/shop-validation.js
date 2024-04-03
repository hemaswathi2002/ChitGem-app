const Shop = require("../models/shop-model")

const shopRegisterValidationSchema = {
  ownerId : {
    notEmpty : {
      errorMessage : '* ownerId should not be empty'
    },
    isMongoId : {
      errorMessage : '* Enter valid mongoId'
    }
  },

  shopName: {
    notEmpty: {
      errorMessage: '* shopname is required',
    },
    trim: true,
  },
  
  address: {
    area: {
      notEmpty: {
        errorMessage: '* Area is required',
      },
      trim: true,
    },
    landmark: {
      notEmpty: {
        errorMessage: '* Landmark is required',
      },
      trim: true,
    },
    pincode: {
      notEmpty: {
        errorMessage: '* Pincode is required',
      },
      isNumeric: {
        errorMessage: '* Enter only numbers',
      },
      isLength: {
        options: { min: 6, max: 6 },
        errorMessage: 'Enter a valid 6-digit pincode',
      },
    },
    city: {
      notEmpty: {
        errorMessage: '* City is required',
      },
      trim: true,
    },
    state: {
      notEmpty: {
        errorMessage: '* State is required',
      },
      trim: true,
    }
  },

  location: {
    notEmpty: {
      errorMessage: '* location is required',
    },
  },

  contact: {
    notEmpty: {
      errorMessage: '* number is required',
    },
    isNumeric: {
      errorMessage: '* enter only numbers',
    },
    isLength: {
      options: {min: 10,max: 10},
      errorMessage: 'enter a valid number',
    },
  },

  description: {
    notEmpty: {
      errorMessage: 'enter the description',
    },
    isLength: {
      options: {min: 25,max: 500},
      errorMessage: 'description should have minimum of 50 words',
    },
  },
  
}

module.exports = shopRegisterValidationSchema
