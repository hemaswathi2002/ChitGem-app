import axios from 'axios'
export const startGetAllShop = () => {
    return async (dispatch) => {
        try{
            const response = await axios.get('http://localhost:3009/api/shops',{
                headers : {
                    Authorization : localStorage.getItem('token')
                }
            })
            console.log(response.data)
            dispatch(setAllShops(response.data))
        }
        catch(err){
            console.log(err)
        }
    }
}

const setAllShops = (data)=>{
    return {
        type : 'SET_ALL_SHOPS',
        payload : data

    }
}