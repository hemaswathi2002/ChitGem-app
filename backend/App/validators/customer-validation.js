
  //customer validation 
  const customerValidationSchema = {
    name: {
        notEmpty: {
            errorMessage: "* Username is required"
        },
        trim: true
    },
    "contact.email": {
        notEmpty: {
            errorMessage: "* Email is required"
        },
        isEmail: {
            errorMessage: "* Email must be in email format"
        },
        normalizeEmail: true,
        trim: true
    },
    "contact.mobile": {
        notEmpty: {
            errorMessage: "* Mobile is required"
        },
        isNumeric: {
            errorMessage: "* Mobile must contain only numbers"
        },
        isLength: {
            options: { min: 10, max: 10 },
            errorMessage: "* Mobile must contain 10 digits"
        },
        trim: true
    }
};

module.exports = customerValidationSchema;

