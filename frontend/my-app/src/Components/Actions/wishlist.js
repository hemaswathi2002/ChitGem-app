import axios from "axios"
export const startGetWishlists = ()=>{
    return async (dispatch)=>{
        try{
            const response = await axios.get('http://localhost:3009/api/wishlists')
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
            const response = await axios.delete(`http://localhost:3009/api/wishlists/${id}`)
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