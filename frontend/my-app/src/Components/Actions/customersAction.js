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