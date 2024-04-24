const initialState = {
    shops: [],
    serverErrors : []
}
const shopReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_SHOP' : {
            localStorage.setItem('shops', JSON.stringify(action.payload));
            return {...state, data: action.payload }

        }
        case 'ADD_SHOP':{
            return {
                ...state,
                data: [...state.data, action.payload]
            }
        }
        case 'UPDATE_SHOP':{
            return {
                ...state,
                data: state.data.map(shop => (shop._id === action.payload._id ? action.payload : shop))
            }
        }
        case 'REMOVE_SHOP':{
            return {
                ...state,
                data: state.data.filter(shop => shop._id !== action.payload)
            }
        }
        case 'SET_SERVER_ERRORS' : {
            return {
                ...state,
                serverErrors: action.payload
            };
        }
        default:
            return state;
    }
};

export default shopReducer;





