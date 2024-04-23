import axios from 'axios'
export const startGetShop = () => {
    return async (dispatch) => {
      try {
        const ownerId = localStorage.getItem('ownerId');
        const response = await axios.get('http://localhost:3009/api/shops', {
          headers: {
            Authorization: localStorage.getItem('token')
          },
          params: {
            ownerId: ownerId 
          }
        });
        dispatch(setShops(response.data));
        console.log(response.data);
      } catch (err) {
        console.log(err);
      }
    };
  };
  
export const setShops = (data) => {
    return {
        type: 'SET_SHOPS', 
        payload: data
    };
}
export const startCreateShop = (formData) => {
    return async (dispatch) => {
        try {
            const response = await axios.post('http://localhost:3009/api/shops', { ...formData, ownerId: localStorage.getItem('ownerId') });
            console.log(response.data);
            dispatch(createShop(response.data));
        } catch (err) {
            console.log(err);
            if (err.response && err.response.data) {
                dispatch(setServerErrors(err.response.data.errors || []));
            }
        }
    };
};

const createShop = (data) => {
    return {
        type : 'ADD_SHOP',
        payload : data
    }
}



export const startUpdateShop = (shopId, formData) => {
    return async (dispatch) => {
        try {
            const response = await axios.put(`http://localhost:3009/api/shops/${shopId}`, { ...formData, ownerId: localStorage.getItem('ownerId') });
            console.log(response.data);
            dispatch(updateShop(response.data));  dispatch(updateShop(response.data));
        } catch (err) {
            console.log(err);
        }
    };
};

const updateShop = (shop) =>{
    return{
        type : 'UPDATE_SHOP',
        payload : shop
    }
}

export const startRemoveShop = (id) => {
    return async (dispatch) => {
        try {
            const response = await axios.delete(`http://localhost:3009/api/shops/${id}`, {
                headers: {
                    Authorization: localStorage.getItem('token')
                },
                data: { ownerId: localStorage.getItem('ownerId') } // Send owner's ID in the request body
            });
            console.log(response.data);
            dispatch(removeShop(id));
        } catch (err) {
            console.log(err);
        }
    };
};
const removeShop = (id) => {
    return {
        type : 'REMOVE_SHOP',
        payload : id
    }
}


export const setServerErrors = (errors) => {
    return { 
        type: "SET_ERRORS",
        payload: errors 
    };
};