import { useEffect } from "react"
import { useDispatch, useSelector} from "react-redux"
import { Table,Button } from 'react-bootstrap';
import { startGetInvoice } from "../../Actions/Invoice"
import InvoiceForm from "./InvoiceForm";
export default function Invoice(){
    const dispatch = useDispatch()
    const invoices = useSelector(state => state.invoice.data)
    // const customerName = invoices.length > 0 ? invoices[0].ownerId.name : '';

     
    console.log(invoices)
    useEffect(()=>{
        dispatch(startGetInvoice())
    },[dispatch])


    return (
        <>
            {/* <h1>Customer Name: {customerName}</h1> */}
            <Table striped bordered hover style={{ marginTop: '80px'}}>
    

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
                            <Button type="submit" style={{ backgroundColor: 'maroon' }}>Pay</Button>

                            </td>
                        </tr>
                    ))}
                   
               
                </tbody> 
            </Table>
            <InvoiceForm/>
           
        </>
    )
}