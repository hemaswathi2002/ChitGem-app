const initialState = {
    shops: [],
    serverErrors: []
};

const shopReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_SHOP':
            return { ...state, shops: action.payload, loading: false, error: null };
        case 'ADD_SHOP':
            return { ...state, shops: [...state.shops, action.payload], loading: false, error: null };
        
               case 'UPDATE_SHOP': {
            return {
                ...state,
                shops: state.shops.map(shop => (shop._id === action.payload._id ? action.payload : shop))
            };
        }
        case 'REMOVE_SHOP': {
            return {
                ...state,
                shops: state.shops.filter(shop => shop._id !== action.payload)
            };
        }
        case 'SET_SERVER_ERRORS': {
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
