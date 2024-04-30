export default function CustomersReducer(state,action){
    switch(action.type){
        case 'SET_CUSTOMERS' : {
            return {...state,data:action.payload}
        }
        case 'ADD_CUSTOMERS' :{
            const newData = Array.isArray(state.data) ? [...state.data, action.payload] : [action.payload];
            return { ...state, data: newData };        }
        // case 'UPDATE_CUSTOMERS' : {
        //     const updatedData = state.data.map(customer =>
        //         customer._id === action.payload._id ? action.payload : customer
        //     );
        //     return { ...state, data: updatedData };
        // }
        // case 'DELETE_CUSTOMERS' : {
        //     return {...state,data : state.data.filter(ele=>ele._id!==action.payload)}
        // }
        default : {
            return state
        }
    }
}