import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Table, Button } from 'react-bootstrap';
import { startGetInvoice } from "../../Actions/customersAction"
import { startPayment } from "../../Actions/ChitPayment";
import { useNavigate } from "react-router-dom";

export default function Invoice() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const invoices = useSelector((state) => {
        return state.customer.invoice
    })

    useEffect(() => {
        dispatch(startGetInvoice())
    }, [dispatch])

    const handlePay = (invoiceId, amount) => {
        const payData = {
            invoiceId: invoiceId,
            amount: amount
        };
        console.log(payData)
        dispatch(startPayment(payData));
    };

    return (
        <>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {invoices.map((invoice) => (
                        <tr key={invoice._id}>
                            <td>{invoice.name}</td>
                            <td>{new Date(invoice.date).toLocaleDateString()}</td>
                            <td>
                                <Button onClick={() => handlePay(invoice._id,invoice.amount)}>Pay</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    )
}
