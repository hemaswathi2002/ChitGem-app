const initialState = {
    allShops : []
}

export const adminReducer = (state = initialState,action)=>{
    switch(action.type){

        case 'SET_ALL_SHOPS' : {
            return {...state, allShops : action.payload }
        }

        default : {
            return {...state}
        }
    }
}

