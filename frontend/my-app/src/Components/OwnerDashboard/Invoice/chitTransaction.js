import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getChitTransaction } from '../../Actions/Invoice';
import { Table } from 'react-bootstrap';

export default function ChitTransaction() {
    const dispatch = useDispatch();
    const { chitId } = useParams();
    const transactions = useSelector(state => state.invoice.chitPayment)
    const formatDateTime = (dateTimeStr) => {
        const dateTime = new Date(dateTimeStr)
        const date = dateTime.toLocaleDateString()
        const time = dateTime.toLocaleTimeString()
        return { date, time }
    }

    useEffect(() => {
        if (chitId) {
            dispatch(getChitTransaction(chitId));
        }
    }, [dispatch, chitId]);

    return (
        <div style={{ marginTop: '20px' }}>
            <h2>Transactions for Chit ID: {chitId}</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Time</th>
                        <th>TransactionId</th>
                        <th>GoldPrice</th>
                        <th>GoldHarvested</th>
                        <th>Payment Type</th>
                        <th>Amount</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((ele) => (
                        <tr key={ele._id}>
                            <td>{formatDateTime(ele.paymentDate).date}</td>
                            <td>{formatDateTime(ele.paymentDate).time}</td>
                            <td>{ele.transactionId}</td>
                            <td>{ele.goldPrice}</td>
                            <td>{ele.goldHarvested}</td>
                            <td>{ele.paymentType}</td>
                            <td>{ele.amount}</td>
                            <td style = {{color:'green', fontFamily:'Bold'}}>{ele.paymentStatus}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}
