const initialState = {
    shop : [],
    serverErrors : []
}

export const ownerReducer = (state = initialState,action)=> {
    switch(action.type){
        case 'ADD_SHOP':{
            return {
                ...state,
                data: [...state.shop, action.payload]
            }
        }
        case 'UPDATE_SHOP':{
            return {
                ...state,
                data: state.shop.map(shop => (shop._id === action.payload._id ? action.payload : shop))
            }
        }
        case 'REMOVE_SHOP':{
            return {
                ...state,
                data: state.shop.filter(shop => shop._id !== action.payload)
            }
        }
        case 'SET_SERVER_ERRORS': {
            return {
                ...state,
                serverErrors: action.payload
            }
        }

        case 'CLEAR_SERVER_ERRORS': {
            return {
                ...state,
                serverErrors: [] 
            };
        }
        default : {
            return {...state}
        }
    }
}