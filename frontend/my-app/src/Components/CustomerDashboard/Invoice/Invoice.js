import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Table, Button, Row, Col } from 'react-bootstrap' // Import Row and Col for grid layout
import { startGetInvoice } from "../../Actions/customersAction"
import { startPayment } from "../../Actions/ChitPayment"
import { useNavigate } from "react-router-dom"
import CountUp from "react-countup"

export default function Invoice() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const invoices = useSelector((state) => state.customer.invoice)

    useEffect(() => {
        dispatch(startGetInvoice())
    }, [dispatch])

    const handlePay = (invoiceId, amount) => {
        const payData = {
            invoiceId: invoiceId,
            amount: amount
        }
        console.log(payData)
        dispatch(startPayment(payData))
    }

    return (
        <div style={{ paddingTop: '60px' }}>
                   <Row style={{ border: '2px solid #e75480', borderRadius: '5px', marginBottom: '10px' }}> 

                <Col>
                    <Table bordered hover>
                    <thead style={{ backgroundColor: 'lightpink', border: '2px solid darkpink' }}>
                            <tr>
                                <th>Name</th>
                                <th>Date</th>
                                <th>Total Amount</th>
                                <th>Amount Paid</th>
                                <th>Pending Amount</th>
                                <th>Amount</th>
                                <th>Gold Harvested (gms)</th>
                                <th>Payment Status</th>
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
                                        <Button onClick={() => handlePay(invoice._id, invoice.amount)}>Pay</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>
            <Row style={{ border: '2px solid #e75480', borderRadius: '5px' }}> 
                <Col>
                    <div>
                        <h2>
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
                </Col>
            </Row>
        </div>
    )
}
