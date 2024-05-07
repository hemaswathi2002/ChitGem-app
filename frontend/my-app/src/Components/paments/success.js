import axios from "axios"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
export default function Succes(){
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const stripId = localStorage.getItem('stripId')
    console.log(stripId)
    useEffect(()=>{
        (async()=>{
           try{
            const response= await axios.put(`http://localhost:3009/api/payments/status/update/${stripId}`)
            console.log('response from stripe put request',response.data)
            const invoiceId=response.data.invoiceId
            // console.log(invoiceId)
            // dispatch(startPaymentStatusSuccess(transactionId,navigate))
           // const updatedBooking=await axios.put(`http://localhost:3045/api/booking/payment/update/${bookingId}`)
            // console.log("update",updatedBooking.data)
           }catch(err){
            console.log(err)
           }
        })();
    },[])
    console.log(stripId)

    return (
        <div style={{ paddingTop: '80px' }}>
            <h1>payment is succes</h1>
        </div>
    )
}