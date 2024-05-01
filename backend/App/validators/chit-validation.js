const Chit=require('../models/chit-model')

const chitRegisterValidationSchema={
    // shopId:{
    //     notEmpty : {
    //         errorMessage : '* shopId should not be empty'
    //     },
    //     isMongoId : {
    //         errorMessage : '* Enter a valid mongoId'
    //     }
    // },
    // customerId:{
    //     notEmpty:{
    //         errorMessage:"* customerId should not be empty "
    //     },
    //     isMongoId:{
    //         errorMessage:"*Enter a valid mongoId"
    //     }
    // },
        chitAmount: {
          notEmpty: {
            errorMessage: "* chitAmount should not be empty"
          },
          isNumeric: {
            errorMessage: "* chitAmount should be a number"
          },
          custom: {
            options: async function(value){
                if(value<500){
                    throw new Error("* chitAmount should not be less than rupees 500")
                }else{
                    return true
                }
            }
          }
        },
      
    totalAmount:{
        notEmpty:{
            errorMessage:"* total amount is required"
        },
        isNumeric:{
            errorMessage:"*total amount should be number"
        }
    },

        "date.startDate": {
          notEmpty: {
            errorMessage: "* Date should not be empty"
          },
          custom: {
            options: (value, { req }) => {
              return !isNaN(Date.parse(value))
            },
            errorMessage: "* Date should be in valid format (e.g., yyyy-mm-dd)"
          },
        },    
    benefits:{
        notEmpty:{
            errorMessage:"* benefits should not be empty"
        }
    },
    termsAndConditions:{
        notEmpty:{
            errorMessage:"* terms and conditions shouldnot be empty"
        }
    },
    // goldPrice:{
    //     notEmpty:{
    //         errorMessage:"* goldPrice should not be empty"
    //     },
    //     isNumeric: {
    //         errorMessage: "* goldPrice should be a number"
    //     }
    // },   
}
module.exports=chitRegisterValidationSchema

