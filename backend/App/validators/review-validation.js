const reviewValidationSchema = {
    customerId : {
        notEmpty : {
            errorMessage : "* customerId is required"
        },
        isMongoId : {
            errorMessage: "* enter valid mongoId"
        }
    },
    shopId: {
        notEmpty : {
            errorMessage : "* shopId is required"
        },
        isMongoId : {
            errorMessage : "* enter valid mongoId"
        }
    }
}
module.exports = reviewValidationSchema