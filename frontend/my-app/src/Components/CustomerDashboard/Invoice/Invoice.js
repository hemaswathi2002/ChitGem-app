import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Button, Row, Col, FormControl } from 'react-bootstrap'; // Import FormControl for search box
import { startGetInvoice } from "../../Actions/customersAction";
import { startPayment } from "../../Actions/ChitPayment";
import { useNavigate } from "react-router-dom";
import CountUp from "react-countup";

export default function Invoice() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const invoices = useSelector((state) => state.customer.invoice);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        dispatch(startGetInvoice());
    }, [dispatch]);

    const handlePay = (invoiceId, amount) => {
        const payData = {
            invoiceId: invoiceId,
            amount: amount
        };
        console.log(payData);
        dispatch(startPayment(payData));
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredInvoices = invoices.filter(invoice =>
        invoice.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div style={{ paddingTop: '60px' }}>
            <FormControl
                type="text"
                placeholder="Search by Chit Name"
                value={searchTerm}
                onChange={handleSearch}
                style={{ marginBottom: '20px', width: '300px' }}
            />
            <table style={{ border: '2px solid maroon', width: '98%', borderCollapse: 'collapse' }}>
                <thead style={{ border: '2px solid maroon', backgroundColor: 'pink', color: 'black' }}>
                    <tr>
                        <th style={{ border: '2px solid pink' }}>Name</th>
                        <th style={{ border: '2px solid pink' }}>Date</th>
                        <th style={{ border: '2px solid pink' }}>Total Amount</th>
                        <th style={{ border: '2px solid pink' }}>Amount Paid</th>
                        <th style={{ border: '2px solid pink' }}>Pending Amount</th>
                        <th style={{ border: '2px solid pink' }}>Amount</th>
                        <th style={{ border: '2px solid pink' }}>Gold Harvested (gms)</th>
                        <th style={{ border: '2px solid pink' }}>Payment Status</th>
                        <th style={{ border: '2px solid pink' }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredInvoices.map((invoice) => (
                        <tr key={invoice._id}>
                            <td style={{ border: '2px solid maroon' }}>{invoice.name}</td>
                            <td style={{ border: '2px solid maroon' }}>{new Date(invoice.date).toLocaleDateString()}</td>
                            <td style={{ border: '2px solid maroon' }}>{invoice.totalAmount}</td>
                            <td style={{ border: '2px solid maroon' }}>{invoice.amountPaid}</td>
                            <td style={{ border: '2px solid maroon' }}>{invoice.amountPending}</td>
                            <td style={{ border: '2px solid maroon' }}>{invoice.amount}</td>
                            <td style={{ border: '2px solid maroon' }}>{invoice.goldHarvested}</td>
                            <td style={{ border: '2px solid maroon' }}>{invoice.paymentStatus}</td>
                            <td style={{ border: '2px solid maroon' }}>
                                <Button onClick={() => handlePay(invoice._id, invoice.amount)}>Pay</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Row style={{ paddingTop: '50px', paddingBottom: '50px', justifyContent: 'center', backgroundColor: 'green', color: 'white', border: '2px solid white', borderRadius: '5px', width: '500px', margin: 'auto' }}>
                <Col>
                    <h2 style={{ textAlign: 'center' }}>
                        SAVINGS -{" "}
                        <CountUp
                            start={0}
                            end={filteredInvoices.reduce((acc, curr) => acc + curr.amountPaid, 0)}
                            duration={4}
                            separator=","
                            decimal="."
                            prefix="₹"
                            suffix=""
                        />
                    </h2>
                    <h2>
                        GOLD HARVESTED -{" "}
                        <CountUp
                            start={0}
                            end={filteredInvoices.reduce((acc, curr) => acc + curr.goldHarvested, 0)}
                            duration={2}
                            separator=","
                            decimals={3}
                            decimal="."
                            suffix="gms"
                        />
                    </h2>
                </Col>
            </Row>
        </div>
    );
}
