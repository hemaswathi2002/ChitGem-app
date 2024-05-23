import axios from "axios"
import { useEffect } from "react"
import { useDispatch} from "react-redux"
import { useNavigate } from "react-router-dom"
import Swal from 'sweetalert2'
import { startUpdateInvoice } from "../Actions/ChitPayment"
export default function Succes(){
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const stripId = localStorage.getItem('stripId')
    console.log(stripId)
    const handleSuccess = () => {
        Swal.fire({
            icon: 'success',
            title: 'Payment Successful!',
            text: 'Thank you for your payment.',
            confirmButtonText: 'OK',
            confirmButtonColor: '#28a745',
            customClass: {
                icon: 'green-icon',
            }
        }).then((result) => {
            if (result) {
                navigate('/invoice')
            }
        });
    }
    
    useEffect(()=>{
        (async()=>{
           try{
            const response= await axios.put(`http://localhost:3009/api/payments/status/update/${stripId}`)
            console.log('response from stripe put request',response.data)
            if(response){
                handleSuccess()
            }
            const invoiceId=response.data.invoiceId
            console.log(invoiceId)
            dispatch(startUpdateInvoice(invoiceId))
            
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
        </div>
    )
}