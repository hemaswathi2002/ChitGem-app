import { useEffect } from "react"
import { useDispatch, useSelector} from "react-redux"
import { Table } from 'react-bootstrap';
import { startGetInvoice } from "../../Actions/Invoice"
import InvoiceForm from "./InvoiceForm";
export default function Invoice(){
    const dispatch = useDispatch()
    // const invoices = useSelector((state)=>{
    //     return state.customer.invoice
    // })
    // console.log(invoices)
    useEffect(()=>{
        dispatch(startGetInvoice())
    },[dispatch])


    return (
        <>
            {/* <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Month</th>
                        <th>Amount</th>
                        <th>Gold Harvested</th>
                    </tr>
                </thead>
                <tbody>
                    {invoices.map((ele) => (
                        <tr key={ele._id}>
                            <td>{ele.date}</td>
                            <td>{ele.paymentMonth}</td>
                            <td>{ele.amountPaid}</td>
                            <td>{ele.goldHarvested}</td>
                        </tr>
                    ))}
                </tbody>
            </Table> */}
            <InvoiceForm/>
           
        </>
    )
}