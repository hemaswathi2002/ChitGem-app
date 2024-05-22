import { useEffect,useState } from "react"
import { useDispatch, useSelector} from "react-redux"
import { Table,Button } from 'react-bootstrap'
import { useParams,useNavigate} from "react-router-dom"
import CountUp from 'react-countup'
import { startGetInvoice } from "../../Actions/Invoice"
export default function OwnerInvoice(){
    const dispatch = useDispatch()
    const { chitId } = useParams()
    const invoices = useSelector(state => state.invoice.data)
    console.log(invoices,"ownerinvoice")

     
    console.log(invoices)
    const navigate = useNavigate()
    useEffect(()=>{
        if (chitId) {
            dispatch(startGetInvoice(chitId));
        }   
    },[dispatch,chitId])

    const handleTransactions = (chitId)=>{
        navigate(`/chits/${chitId}/transactions`)
    }


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
                        <th>Actions</th>
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
                                <button onClick = {()=>handleTransactions(invoice.chit)}>view Transactions</button>
                            </td>
                        </tr>
                    ))}
                   
               
                </tbody> 
            </Table>
            <div style={{ paddingTop: '50px', paddingBottom: '50px', justifyContent: 'center', backgroundColor: 'green', color: 'white', border: '2px solid white', borderRadius: '5px', width: '500px', margin: 'auto' }}>
            <h2 style={{textAlign:'center'}}>
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
            {/* <InvoiceForm/> */}
           
        </>
    )
}