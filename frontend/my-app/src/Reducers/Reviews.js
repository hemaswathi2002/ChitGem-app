const initialState = {
    data: [],
    serverErrors: []
};

const ReviewReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_REVIEW':
            return { ...state, data: action.payload };
        case 'ADD_REVIEW':
            return {
                ...state,
                data: [...state.data, action.payload]
            };
        case 'SET_ERRORS':
            return {
                ...state,
                serverErrors: action.payload
            };
        case 'UPDATE_REVIEW':
            return {
                ...state,
                data: state.data.map(review => (review._id === action.payload._id ? action.payload : review))
            };
        case 'DELETE_REVIEW':
            return {
                ...state,
                data: state.data.filter(review => review._id !== action.payload)
            };
        default:
            return state;
    }
};

export default ReviewReducer;
