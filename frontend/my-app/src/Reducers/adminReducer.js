const initialState = {
    allShops : []
}

export const adminReducer = (state = initialState,action)=>{
    switch(action.type){

        case 'SET_ALL_SHOPS' : {
            return {...state, allShops : action.payload }
        }

        case 'SET_SHOP_STATUS': {
            console.log("Payload in SET_SHOP_STATUS:", action.payload)
            return {
                ...state,
                allShops: state.allShops.map((shop) => {
                    if (shop._id === action.payload._id) {
                        return { ...shop, approvalStatus: action.payload.approvalStatus };
                    }
                    return shop;
                })
            }
        }
        default : {
            return {...state}
        }
    }
}

