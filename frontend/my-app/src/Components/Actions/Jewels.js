import axios from 'axios'

export const startGetJewels = ()=>{
    return async (dispatch)=>{
        try{
            const response = await axios.get('http://localhost:3009/api/jewels')
            console.log(response.data)
            dispatch(setJewels(response.data))
        }
        catch(err){
            console.log(err)
        }
    }
}

const setJewels = (data)=>{
    return {
        type : 'SET_JEWELS',
        payload : data
    }
    
}