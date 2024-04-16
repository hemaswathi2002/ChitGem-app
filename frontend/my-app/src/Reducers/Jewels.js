const initialState = {
    jewels : []
}
const JewelsReducer = (state = initialState,action)=>{
    switch(action.type){
        case 'SET_JEWELS' : {
            return {...state, data:action.payload}
        }
        default : {
            return {...state}
        }
    }
}

export default JewelsReducer