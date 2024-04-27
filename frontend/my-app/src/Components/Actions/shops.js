import axios from 'axios'
export const startGetShop = (ownerId) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`http://localhost:3009/api/shops/${ownerId}`, {
                headers: {
                    Authorization: localStorage.getItem('token')
                }
            });
            console.log(response.data);
            dispatch(setShops(response.data));
            // localStorage.setItem('shops', JSON.stringify(response.data));
            
        } catch (err) {
            console.log(err);
        }
    };
};
const setShops = (data)=>{
    return {
        type : 'SET_SHOP',
        payload : data

    }
}


export const startCreateShop = (formData) => {
    return async (dispatch) => {
        try{
            const response = await axios.post('http://localhost:3009/api/shops', formData,{
                    headers : {
                        Authorization : localStorage.getItem('token')
                    }
                });
                console.log(response.data);
                console.log(formData)
                dispatch(createShop(response.data))
        }
        catch(err){
            console.log(err);
            if (err.response && err.response.data) {
                dispatch(setServerErrors(err.response.data.errors || []));
            }
        }
    }
}

const createShop = (data) => {
    return {
        type : 'ADD_SHOP',
        payload : data
    }
}

export const startUpdateShop = (id,formData) => {
    return async (dispatch) => {
        try{
            const response = await axios.put(`http://localhost:3009/api/shops/${id}`, formData,{
                    headers : {
                        Authorization : localStorage.getItem('token')
                    }
                });
                console.log(response.data)
                dispatch(updateShop(response.data))
        }
        catch(err){
            console.log(err)
        }
        
    }
}

const updateShop = (data) =>{
    return{
        type : 'UPDATE_SHOP',
        payload : data
    }
}

export const clearServerErrors = () => ({
    type: 'CLEAR_SERVER_ERRORS'
})

export const startRemoveShop = (id) => {
    return async (dispatch) => {
        try{
            const response = await axios.delete(`http://localhost:3009/api/shops/${id}`,{
                    headers : {
                        Authorization : localStorage.getItem('token')
                    }
                });
                console.log(response.data)
                dispatch(removeShop(id))
        }
        catch(err){
            console.log(err)
        }
    }
}

const removeShop = (id) => {
    return {
        type : 'REMOVE_SHOP',
        payload : id
    }
}

export const setServerErrors = (errors) => ({
    type: 'SET_SERVER_ERRORS',
    payload: errors
});