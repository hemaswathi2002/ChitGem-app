import { useEffect } from "react"
import { useDispatch, useSelector} from "react-redux"
import { Table,Button } from 'react-bootstrap';
import { startGetInvoice } from "../../Actions/Invoice"
// import InvoiceForm from "./InvoiceForm";
export default function OwnerInvoice(){
    const dispatch = useDispatch()
    const invoices = useSelector(state => state.invoice.data)
    console.log(invoices,"ownerinvoice")

     
    console.log(invoices)
    useEffect(()=>{
        dispatch(startGetInvoice())
    },[dispatch])


    return (
        <>
            <Table striped bordered hover style={{ marginTop: '80px'}}>
    

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
                        </tr>
                    ))}
                   
               
                </tbody> 
            </Table>
            {/* <InvoiceForm/> */}
           
        </>
    )
}