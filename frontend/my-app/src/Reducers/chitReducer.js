// chitReducer.js
const chitReducer = (state, action) => {
    switch (action.type) {
        case 'SET_CHIT' : {
            return {...state, data: action.payload }
        }
        case 'ADD_CHIT':
            return {
                ...state,
                data: [...state.data, action.payload]
            };
        case 'UPDATE_CHIT':
            return {
                ...state,
                data: state.data.map(chit => (chit._id === action.payload._id ? action.payload : chit))
            };
        case 'DELETE_CHIT':
            return {
                ...state,
                data: state.data.filter(chit => chit._id !== action.payload)
            };
        default:
            return state;
    }
};

export default chitReducer;
