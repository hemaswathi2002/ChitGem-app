const initialState = {
    data: []
}

const wishlistReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_WISHLISTS': {
            return { ...state, data: action.payload }
        }
   
    
        case 'REMOVE_WISHLISTS': {
            return {
                ...state,
                data: state.data.filter((wishlist) => wishlist._id !== action.payload)
            }
        }
        default: {
            return { ...state }
        }
    }
}

export default wishlistReducer


