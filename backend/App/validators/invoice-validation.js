
// const invoicevalidationSchema={
//     // userId : {
//     //     notEmpty : {
//     //         errorMessage : '* userId should not be empty'
//     //     },
//     //     isMongoId : {
//     //         errorMessage : '* Enter a valid mongoId'
//     //     }
//     // },
//     // customerId:{
//     //     notEmpty:{
//     //         errorMessage:"* customerId should not be empty "
//     //     },
//     //     isMongoId:{
//     //         errorMessage:"*Enter a valid mongoId"
//     //     }
//     // },
//     // ChitId:{
//     //     notEmpty:{
//     //         errorMessage:"* ChitId should not be empty "
//     //     },
//     //     isMongoId:{
//     //         errorMessage:"*Enter a valid mongoId"
//     //     }
//     // },
//     // amount:{
//     //     notEmpty: {
//     //       errorMessage: "* chitAmount should not be empty"
//     //     },
//     //     isNumeric: {
//     //       errorMessage: "* chitAmount should be a number"
//     //     }
//     // },
//     paymentMonth :{
//         notEmpty:{
//             errorMessage:'*paymentMonth is required'
//         },
//     },
//     date: {
//         notEmpty: {
//           errorMessage: "* Date should not be empty"
//         },
//         custom: {
//           options: (value, { req }) => {
//             return !isNaN(Date.parse(value))
//           },
//           errorMessage: "* Date should be in valid format (e.g., yyyy-mm-dd)"
//         },
//       },  
// }
// module.exports=invoicevalidationSchema