const initialState = {
    data: []
}

const JewelsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_JEWELS': {
            return { ...state, data: action.payload }
        }
        case 'CREATE_JEWELS': {
            return { ...state, data: [...state.data, action.payload] }
        }
        case 'UPDATE_JEWELS': {
            return {
                ...state,
                data: state.data.map((jewel) => (jewel._id === action.payload._id ? action.payload : jewel))
            }
        }
        case 'REMOVE_JEWELS': {
            return {
                ...state,
                data: state.data.filter((jewel) => jewel._id !== action.payload)
            }
        }
        default: {
            return { ...state }
        }
    }
}

export default JewelsReducer