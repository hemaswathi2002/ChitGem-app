// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// // import { addInvoice, updateInvoice } from
// import { fetchCustomers } from '../Actions/Customers'

// export default function InvoicesForm(props) {
//     const dispatch = useDispatch();
//     const serverErrors = useSelector((state) => state.invoices.serverErrors);
//     const invoice = useSelector((state) => state.invoices.data.find(ele => ele._id === props.editId));
//     const customers = useSelector((state) => state.customers.data);

//     const [form, setForm] = useState(invoice ? {
//         customerId: invoice.customerId,
//         lineItems: invoice.linetems,
//         amount: invoice.amount,
//         paymentMonth: invoice.paymentMonth,
//         date: invoice.date
//     } : {
//         customerId: '',
//         lineItems: [],
//         amount: '',
//         paymentMonth: '',
//         date: ''
//     });

//     useEffect(() => {
//         dispatch(fetchCustomers())
//     }, [dispatch]);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setForm({ ...form, [name]: value });
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();

//         const resetForm = () => {
//             setForm({
//                 customerId: '',
//                 lineItems: [],
//                 amount: '',
//                 paymentMonth: '',
//                 date: ''
//             });
//         };

//         if (invoice) {
//             dispatch(updateInvoice(invoice._id, form));
//         } else {
//             dispatch(addInvoice(form));
//         }

//         resetForm();
//     };

//     return (
//         <>
//             {
//                 serverErrors.length > 0 && (
//                     <div>
//                         These errors prohibited the form from being saved:
//                         <ul>
//                             {serverErrors.map((ele, i) => (
//                                 <li key={i}> {ele.msg}</li>
//                             ))}
//                         </ul>
//                     </div>
//                 )
//             }
//             <form onSubmit={handleSubmit}>
//                 <div className="form-group">
//                     <label
//                         className="form-label"
//                         htmlFor="customerId"
//                     >
//                         Customer
//                     </label>
//                     <select
//                         value={form.customerId}
//                         onChange={handleChange}
//                         name="customerId"
//                         className="form-control"
//                     >
//                         <option value="">Select Customer</option>
//                         {customers.map(customer => (
//                             <option key={customer._id} value={customer._id}>{customer.name}</option>
//                         ))}
//                     </select>
//                 </div>
//                 <div className="form-group">
//                     <label
//                         className="form-label"
//                         htmlFor="amount"
//                     >
//                         Amount
//                     </label>
//                     <input
//                         type="text"
//                         value={form.amount}
//                         onChange={handleChange}
//                         name="amount"
//                         className="form-control"
//                     />
//                 </div>
//                 <div className="form-group">
//                     <label
//                         className="form-label"
//                         htmlFor="paymentMonth"
//                     >
//                         Payment Month
//                     </label>
//                     <input
//                         type="text"
//                         value={form.paymentMonth}
//                         onChange={handleChange}
//                         name="paymentMonth"
//                         className="form-control"
//                     />
//                 </div>
//                 <div className="form-group">
//                     <label
//                         className="form-label"
//                         htmlFor="date"
//                     >
//                         Date
//                     </label>
//                     <input
//                         type="date"
//                         value={form.date}
//                         onChange={handleChange}
//                         name="date"
//                         className="form-control"
//                     />
//                 </div>
//                 <input type="submit" className="btn btn-primary" />
//             </form>
//         </>
//     );
// }
