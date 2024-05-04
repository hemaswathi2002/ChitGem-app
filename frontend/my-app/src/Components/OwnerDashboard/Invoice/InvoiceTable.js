import { useEffect } from "react"
import { useDispatch, useSelector} from "react-redux"
import { Table } from 'react-bootstrap';
import { startGetInvoice } from "../../Actions/Invoice"
import InvoiceForm from "./InvoiceForm";
export default function Invoice(){
    const dispatch = useDispatch()
    const invoices = useSelector(state => state.invoice.data) 
    console.log(invoices)
    useEffect(()=>{
        dispatch(startGetInvoice())
    },[dispatch])


    return (
        <>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Month</th>
                        <th>amount</th>
                        <th>gold price</th>
                        <th>action</th>
                    </tr>
                </thead>
                <tbody>
                    {invoices.map((invoice) => (
                        <tr key={invoice._id} value = {invoice._id}>
                            <td>{new Date(invoice.date).toLocaleDateString()}</td>
                            <td>{invoice.paymentMonth}</td>
                            <td>
                            {invoice.lineItems.map((item, index) => (
                                    <div key={index}>
                                        {item.amount}
                                    </div>
                                ))}
                                </td>
                                <td>
                                {invoice.lineItems.map((item, index) => (
                                    <div key={index}>
                                        {item.goldPrice}
                                    </div>
                                ))}
                            </td>
                            <td>
                                <button>pay</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <InvoiceForm/>
           
        </>
    )
}