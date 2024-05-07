import axios from 'axios'
import { useEffect } from 'react'
export default function Cancel(){
    useEffect(()=>{
        const stripeId = localStorage.getItem('stripeId')
        (async()=>{
           try{
            const response= await axios.put(`http://localhost:3009/api/payment/status/update/${stripeId}`)
            console.log('response from stripe put request',response.data)
            // const invoiceId=response.data.invoiceId
            // const updatedBooking=await axios.put(`http://localhost:3045/api/payment/failer/${invoiceId}`)
            // console.log("update",updatedBooking.data)
           }catch(err){
            console.log(err)
           }
        })()
    },[])
    return (
        <div>
            <p>payment is pending/cancelled</p>
        </div>
    )
}