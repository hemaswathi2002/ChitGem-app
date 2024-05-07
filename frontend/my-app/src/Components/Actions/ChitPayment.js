import axios from 'axios'
export const startPayment = (data) =>{
    
    return async(dispatch)=>{
        try{
            const response = await axios.post("http://localhost:3009/api/create-checkout-session",data,{
                headers:{
                    Authorization:localStorage.getItem('token')
                }
            })
            console.log(response.data)
            localStorage.setItem('stripId',response.data.id)
            localStorage.setItem('invoiceId', response.data.id)
            //localStorage.setItem('paymentId', response.data.paymentId)
            window.location = response.data.url
        }catch(err){
            console.log(err)
        }
    }
}

