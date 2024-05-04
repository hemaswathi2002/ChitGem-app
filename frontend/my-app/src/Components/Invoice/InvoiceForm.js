import React, { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startCreateInvoice, startGetInvoices } from '../Actions/Invoice';
import { CustomersContext } from '../../Context/CustomersContext';

export default function InvoicesForm(props) {
    const dispatch = useDispatch();
    const serverErrors = useSelector((state) => state.invoices.serverErrors);
    const invoice = useSelector((state) => state.invoices.data.find(ele => ele._id === props.editId));

    const { customers } = useContext(CustomersContext);

    const [form, setForm] = useState(invoice ? {
        customerId: invoice.customerId,
        lineItems: invoice.lineItems,
        amount: invoice.amount,
        paymentMonth: invoice.paymentMonth,
        date: invoice.date
    } : {
        customerId: '',
        lineItems: [],
        amount: '',
        paymentMonth: '',
        date: ''
    });


    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const resetForm = () => {
            setForm({
                customerId: '',
                lineItems: [],
                amount: '',
                paymentMonth: '',
                date: ''
            });
        };

        if (!invoice) {
            dispatch(startCreateInvoice(form));
            dispatch(startGetInvoices([...form, invoice]))
        }

        resetForm();
    }

    return (
        <>
            {
                serverErrors.length > 0 && (
                    <div>
                        These errors prohibited the form from being saved:
                        <ul>
                            {serverErrors.map((ele, i) => (
                                <li key={i}> {ele.msg}</li>
                            ))}
                        </ul>
                    </div>
                )
            }
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="customerId">Customer</label>
                    <select
                        id="customerId"
                        name="customerId"
                        value={form.customerId}
                        onChange={handleChange}
                        className="form-control"
                    >
                        <option value="">Select Customer</option>
                        {customers.map(customer => (
                            <option key={customer._id} value={customer._id}>{customer.name}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="amount">Amount</label>
                    <input
                        type="text"
                        id="amount"
                        name="amount"
                        value={form.amount}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="paymentMonth">Payment Month</label>
                    <input
                        type="text"
                        id="paymentMonth"
                        name="paymentMonth"
                        value={form.paymentMonth}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="date">Date</label>
                    <input
                        type="date"
                        id="date"
                        name="date"
                        value={form.date}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>
                <Button type="submit" style={{ backgroundColor: '#ffb6c1' }}>Submit</Button>
            </form>
        </>
    );
}
