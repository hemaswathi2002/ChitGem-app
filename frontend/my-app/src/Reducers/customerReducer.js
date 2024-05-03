const initialState = {
    data : {},
    invoice : []
}

export const customerReducer = (state = initialState,action)=>{
    switch(action.type){
        case 'GET_ONE_USER':{
            return {...state, data : action.payload}
        } 
        case 'START_GET_INVOICE' : {
            return {...state, invoice : action.payload}
        }
        default : {
            return {...state}
        }
    }
}