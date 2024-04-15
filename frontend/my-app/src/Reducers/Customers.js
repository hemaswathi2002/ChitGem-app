export default function CustomersReducer(state,action){
    switch(action.type){
        case 'SET_CUSTOMERS' : {
            return {...state,data:action.payload}
        }
        case 'ADD_CUSTOMERS' :{
            return {...state, data: [...state.data,action.payload]}
        }
        case 'UPDATE_CUSTOMERS' : {
            return {...state,data: state.data.map()}
        }
        case 'DELETE_CUSTOMERS' : {
            return {...state,data : state.data.filter(ele=>ele._id!==action.payload)}
        }
        default : {
            return state
        }
    }
}