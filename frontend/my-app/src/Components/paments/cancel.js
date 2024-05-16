import axios from 'axios'
import { useEffect } from 'react'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
export default function Cancel(){
    const navigate = useNavigate()
    const handleCancel = ()=> {
        Swal.fire({
            icon: 'error',
            title: 'Payment failed!',
            text: 'Oops... There was an error while processing your payment.',
            confirmButtonText: 'OK',
        }).then((result) => {
            if (result) {
                navigate('/'); // Redirect to home page after confirming the alert
            }
        });
    }
    useEffect(()=>{
        const stripeId = localStorage.getItem('stripeId')
        (async()=>{
           try{
            const response= await axios.put(`http://localhost:3009/api/payment/status/update/${stripeId}`)
            console.log('response from stripe put request',response.data)
            if(response){
                handleCancel()
            }
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