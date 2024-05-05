import axios from 'axios'
export const startGetOneCustomer = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`http://localhost:3009/api/customers`,{
                headers : {
                    Authorization : localStorage.getItem('token')
                }
            })
            console.log(response.data)
            dispatch(getOneCustomer(response.data))
        } catch (error) {
           console.log(error)
        }
    }
}

const getOneCustomer = (data) => ({
    type: 'GET_ONE_USER',
    payload: data
})


export const startGetInvoice = () => {
    return async (dispatch) => {
        try{
            const response = await axios.get('http://localhost:3009/api/invoices/users',{
                headers :{
                    Authorization : localStorage.getItem('token')
                }
            })
            console.log('customerinvoice',response.data)
            dispatch(getInvoice(response.data))
        }
        catch(err){
            console.log('error fetching invoices:', err);

        }
    }
}

const getInvoice = (data)=>{
    return {
        type : 'START_GET_INVOICE',
        payload : data
    }
}