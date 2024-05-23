import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Button } from 'react-bootstrap';
import { useParams, useNavigate } from "react-router-dom";
import CountUp from 'react-countup';
import { startGetInvoice } from "../../Actions/Invoice";

export default function OwnerInvoice() {
    const dispatch = useDispatch();
    const { chitId } = useParams();
    const invoices = useSelector(state => state.invoice.data);
    const navigate = useNavigate();

    useEffect(() => {
        if (chitId) {
            dispatch(startGetInvoice(chitId));
        }
    }, [dispatch, chitId]);

    const handleTransactions = (chitId) => {
        navigate(`/chits/${chitId}/transactions`);
    };

    return (
        <>
            <Table striped bordered hover style={{ marginTop: '80px', borderColor: 'lightpink' }}>
                <thead style={{ backgroundColor: 'maroon', color: 'white' }}>
                    <tr>
                        <th style={{backgroundColor: 'maroon', color: 'white' }}>Name</th>
                        <th style={{ backgroundColor: 'maroon',color: 'white' }}>Date</th>
                        <th style={{backgroundColor: 'maroon', color: 'white' }}>Total Amount</th>
                        <th style={{ backgroundColor: 'maroon',color: 'white' }}>Amount Paid</th>
                        <th style={{ backgroundColor: 'maroon',color: 'white' }}>Pending Amount</th>
                        <th style={{ backgroundColor: 'maroon',color: 'white' }}>Amount</th>
                        <th style={{ backgroundColor: 'maroon',color: 'white' }}>Gold Harvested (gms)</th>
                        <th style={{ backgroundColor: 'maroon',color: 'white' }}>Payment Status</th>
                        <th style={{ backgroundColor: 'maroon',color: 'white' }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {invoices?.map((invoice) => (
                        <tr key={invoice._id}>
                            <td>{invoice.name}</td>
                            <td>{new Date(invoice.date).toLocaleDateString()}</td>
                            <td>{invoice.totalAmount}</td>
                            <td>{invoice.amountPaid}</td>
                            <td>{invoice.amountPending}</td>
                            <td>{invoice.amount}</td>
                            <td>{invoice.goldHarvested}</td>
                            <td>{invoice.paymentStatus}</td>
                            <td>
                                <Button onClick={() => handleTransactions(invoice.chit)}>View Transactions</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <div style={{ paddingTop: '50px', paddingBottom: '50px', justifyContent: 'center', backgroundColor: 'green', color: 'white', border: '2px solid white', borderRadius: '5px', width: '500px', margin: 'auto' }}>
                <h2 style={{ textAlign: 'center' }}>
                    SAVINGS -{" "}
                    <CountUp
                        start={0}
                        end={invoices.reduce((acc, curr) => acc + curr.amountPaid, 0)}
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
                        end={invoices.reduce((acc, curr) => acc + curr.goldHarvested, 0)}
                        duration={2}
                        separator=","
                        decimals={3}
                        decimal="."
                        suffix="gms"
                    />
                </h2>
            </div>
        </>
    );
}
