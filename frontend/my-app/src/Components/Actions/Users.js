import axios from "axios";
export const startGetUserDetails=()=>{
    return async(dispatch)=>{
        try{
            const response=await axios.get('http://localhost:3009/api/users/account',{
                headers:{
                    Authorization:localStorage.getItem('token') 
                }
            })
            console.log("users",response.data)
            dispatch(setUser(response.data))
        }catch(err){
            console.log(err)
        }
    }
}
const setUser=(data)=>{
    return {
        type:"SET_USER_DETAILS",
        payload:data
    }
}

export const startSetUser=()=>{
    return (dispatch)=>{
        dispatch(setUserEmpty({}))
    }
}
const setUserEmpty=(data)=>{
    return {
        type:"SET_USER_EMPTY",
        payload:data
    }
}