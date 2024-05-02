const initialState = {
    data : {},
}

export const customerReducer = (state = initialState,action)=>{
    switch(action.type){
        default : {
            return {...state}
        }
    }
}