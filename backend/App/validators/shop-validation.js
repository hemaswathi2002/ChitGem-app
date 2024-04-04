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
  

    "address.area": {
      notEmpty: {
        errorMessage: '* Area is required',
      },
      trim: true,
    },
    "address.landmark": {
      notEmpty: {
        errorMessage: '* Landmark is required',
      },
      trim: true,
    },
    "address.pincode": {
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
    "address.city": {
      notEmpty: {
        errorMessage: '* City is required',
      },
      trim: true,
    },
    "address.state": {
      notEmpty: {
        errorMessage: '* State is required',
      },
      trim: true,
    },

  location: {
    notEmpty: {
      errorMessage: '* location is required',
    },
  },

  "contact.mobile": {
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
"contact.email":{
  notEmpty: {
    errorMessage: '* email is required',
  },
  isEmail:{
    errorMessage:'*email should be valid'
  },
  normalizeEmail: true,
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
  approvalStatus : {
    isIn : {
      options : [['pending','rejected','approved']]
    }
  }
  
}

module.exports = shopRegisterValidationSchema
