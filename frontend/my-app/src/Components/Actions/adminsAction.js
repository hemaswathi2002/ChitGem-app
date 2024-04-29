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

export const startUpdateStatus = (id,status) => {
    return async (dispatch) => {
        try{
            const response = await axios.put(`http://localhost:3009/api/shops/update/${id}`,{ approvalStatus: status },{
                headers : {
                    Authorization : localStorage.getItem('token')
                }
            })
            console.log(response.data)
            dispatch(updateStatus(response.data))
        }
        catch(err){
            console.log(err)
        }
    }
}

const updateStatus = (data) => {
    return {
        type : 'SET_SHOP_STATUS',
        payload : data
    }
}