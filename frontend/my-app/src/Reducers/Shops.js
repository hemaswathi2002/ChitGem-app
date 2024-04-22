const initialState = {
    shops: []
}
const shopReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_SHOP' : {
            return {...state, data: action.payload }
        }
        case 'ADD_SHOP':
            return {
                ...state,
                data: [...state.data, action.payload]
            };
        case 'UPDATE_SHOP':
            return {
                ...state,
                data: state.data.map(shop => (shop._id === action.payload._id ? action.payload : shop))
            };
        case 'DELETE_SHOP':
            return {
                ...state,
                data: state.data.filter(shop => shop._id !== action.payload)
            };
        default:
            return state;
    }
};

export default shopReducer;





