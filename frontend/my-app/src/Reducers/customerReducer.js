const initialState = {
    data : {},
}

export const customerReducer = (state = initialState,action)=>{
    switch(action.type){
        case 'GET_ONE_USER':{
            return {...state, data : action.payload}
        }
        default : {
            return {...state}
        }
    }
}