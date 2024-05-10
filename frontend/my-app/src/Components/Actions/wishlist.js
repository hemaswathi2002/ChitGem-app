import axios from "axios"
const getUserId = () => {
   return localStorage.getItem('userId')
}
export const startGetWishlists = ()=>{
    return async (dispatch)=>{
        try{
            const userId = getUserId()

            const response = await axios.get(`http://localhost:3009/api/wishlists/${userId}`,{
                headers : {
                    Authorization : localStorage.getItem('token')
                }
            })
            console.log(response.data)
            dispatch(setWishlists(response.data))
        }
        catch(err){
            console.log(err)
        }
    }
}

const setWishlists = (data)=>{
    return {
        type : 'SET_WISHLISTS',
        payload : data
    }
}

export const startRemoveWishlists = (id) => {
    return async(dispatch) => {
        try{
            const response = await axios.delete(`http://localhost:3009/api/wishlists/${id}`,{
                headers : {
                    Authorization : localStorage.getItem('token')
                }
            })
            dispatch(removeWishlists(id))
            return response.data
        }
        catch(err){
            console.log(err)
        }
    }
}

const removeWishlists = (id) => {
    return {
        type : 'REMOVE_WISHLISTS',
        payload : id
    }
}