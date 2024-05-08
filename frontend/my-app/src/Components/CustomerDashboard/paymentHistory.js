import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { startGetPaymentHistory } from "../Actions/customersAction"
export default function PaymentHistory(){
    const dispatch = useDispatch()
    const paymentHistory = useSelector((state)=>{
        return state.payment.chitPayment
    })
    console.log(paymentHistory)
    useEffect(()=>{
        dispatch(startGetPaymentHistory())
       },[dispatch])

       const formatDateTime = (dateTimeString) => {
        const dateTime = new Date(dateTimeString)
        const formattedDate = dateTime.toLocaleDateString()
        const formattedTime = dateTime.toLocaleTimeString()
        return {
            date: formattedDate,
            time: formattedTime
        }
    }

    return (
        <>
        <table>
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Time</th>
                    <th>TransactionId</th>
                    <th>Amount</th>
                    <th>Payment Type</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
            {paymentHistory.map((ele)=>{
                return <tr key = {ele._id}>
                    <td>{formatDateTime(ele.paymentDate).date}</td>
                    <td>{formatDateTime(ele.paymentDate).time}</td>
                    <td>{ele.transactionId}</td>
                    <td>{ele.amount}</td>
                    <td>{ele.paymentType}</td>
                    <td>{ele.paymentStatus}</td>
                </tr>
            })}
            </tbody>
        </table>      
        </>
    )
}