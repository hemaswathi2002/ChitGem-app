import React, { useContext } from 'react';
import { CustomersContext } from '../../Context/CustomersContext';
import '../../index.css'
export default function InvoiceTable({ invoices }) {
    const { customers } = useContext(CustomersContext);

    return (
        <div className="table-responsive">
            <table className="table table-bordered table-striped custom-table">
            <thead style={{ backgroundColor: 'lightpink', border: '2px solid darkpink' }}>
                    <tr>
                        <th>Customer</th>
                        <th>Amount</th>
                        <th>Payment Month</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {invoices.map((invoice) => {
                        const customer = customers.find(customer => customer._id === invoice.customerId);
                        return (
                            <tr key={invoice._id}>
                                <td>{customer ? customer.name : 'Unknown Customer'}</td>
                                <td>{invoice.amount}</td>
                                <td>{invoice.paymentMonth}</td>
                                <td>{new Date(invoice.date).toLocaleDateString()}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
