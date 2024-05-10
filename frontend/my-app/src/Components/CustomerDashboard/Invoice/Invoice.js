import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Table, Button } from 'react-bootstrap';
import { startGetInvoice } from "../../Actions/customersAction"
import { startPayment } from "../../Actions/ChitPayment";
import { useNavigate } from "react-router-dom";
import CountUp from "react-countup"

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
        <div style={{paddingTop : '60px'}}>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Date</th>
                        <th>Total Amount</th>
                        <th>Amount Paid</th>
                        <th>Pending Amount</th>
                        <th>amount</th>
                        <th>GoldHarvested(gms)</th>
                        <th>paymentStatus</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {invoices.map((invoice) => (
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
                                <Button onClick={() => handlePay(invoice._id,invoice.amount)}>Pay</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            </div>
         <div>
        <h2>
          SAVINGS -{" "}
          <CountUp
            start={0}
            end={invoices?.map((invoice)=>invoice.amountPaid)} 
            duration={4}
            separator=","
            // decimals={2}
            decimal="."
            prefix="₹"
            suffix=""
          />
        </h2>
        <h2>
          GOLD HARVESTED -{" "}
          <CountUp
            start={0}
            end={invoices?.map((invoice)=>invoice.goldHarvested)}
            duration={2}
            separator=","
            decimals={3}
            decimal="."
            // prefix="₹"
            suffix="gms"
          />
        </h2>

            </div>
        </>
    )
}
