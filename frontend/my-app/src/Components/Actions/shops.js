import axios from 'axios'
export const startGetShop = () => {
    return async (dispatch) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('Token not found');
            }
            const ownerId = localStorage.getItem('userId');

            const response = await axios.get('http://localhost:3009/api/shops', {
                headers: {
                    Authorization: token
                },   params: {
                    ownerId: ownerId  // Pass the owner's ID as a query parameter
                }
            });

            console.log(response.data);
            dispatch(setShops(response.data));
            
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

const updateShop = (shop) =>{
    return{
        type : 'UPDATE_SHOP',
        payload : shop
    }
}

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

export const setServerErrors = (errors) => {
    return {
        type: 'SET_SERVER_ERRORS',
        payload: errors
    };
};