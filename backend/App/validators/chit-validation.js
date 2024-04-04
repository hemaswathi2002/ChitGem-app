const Chit=require('../models/chit-model')

const chitRegisterValidationSchema={
    shopId:{
        notEmpty : {
            errorMessage : '* shopId should not be empty'
        },
        isMongoId : {
            errorMessage : '* Enter a valid mongoId'
        }
    },
    customerId:{
        notEmpty:{
            errorMessage:"* customerId should not be empty "
        },
        isMongoId:{
            errorMessage:"*Enter a valid mongoId"
        }
    },
    name:{
        notEmpty:{
            errorMessage:"*name is required"
        }
    },
    amount: {
        notEmpty: {
            errorMessage: "* Amount should not be empty"
        },
        isNumeric: {
            errorMessage: "* Amount should be a number"
        },
        custom:{
            options:(value,{req})=>{
                const minAmount=parse.Float(req.body.minAmount)
                const maxAmount=parse.Float(req.body.maxAmount)
                if(minAmount>=maxAmount){
                    throw new Error('* Min amount should be less than max amount')
                }
                return true
            }
        }
    },
    totalAmount:{
        notEmpty:{
            errorMessage:"* total amount is required"
        }
    },
    installements:{
        notEmpty:{
            errorMessage:"* installment should not be empty"
        }
    },
    joinDate: {
        notEmpty: {
            errorMessage: "* Date should not be empty"
        },
        custom: {
            options: (value, { req }) => {
                return !isNaN(Date.parse(value))
            },
            errorMessage: "* Date should be in valid format (e.g., yyyy-mm-dd)"
        }
    },
    endDate: {
        notEmpty: {
            errorMessage: "* Date should not be empty"
        },
        custom: {
            options: (value, { req }) => {
                return !isNaN(Date.parse(value))
            },
            errorMessage: "* Date should be in valid format (e.g., yyyy-mm-dd)"
        },
        custom: {
            options: (value, { req }) => {
                const startDate = new Date(req.body.startDate)
                const endDate = new Date(value)
                return endDate > startDate
            },
            errorMessage: "* End date must be greater than the start date"
        }
    },
    status: {
        notEmpty: {
            errorMessage: "* status should be selected"
        }, 
        isIn: {
            options: [['active','closed']],
            errorMessage: "*status  should selected from the given list"
        }
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
    goldPrice:{
        notEmpty:{
            errorMessage:"* goldPrice should not be empty"
        },
        isNumeric: {
            errorMessage: "* goldPrice should be a number"
        }
    },
    goldHarvested:{
        notEmpty:{
            errorMessage:"* goldHarvested should not be empty"
        },
        isNumeric: {
            errorMessage: "* goldHarvested should be a number"
        }
    },
    amountSaved:{
        notEmpty:{
            errorMessage:"* amountSaved should not be empty"
        },
        isNumeric: {
            errorMessage: "* amountSaved should be a number"
        }
    },   
}
module.exports=chitRegisterValidationSchema

