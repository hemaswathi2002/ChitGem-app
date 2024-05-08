const chitPament = {
    chitPayment:[],
}

const paymentReducer = (state=chitPament , action)=>{
    switch(action.type){
        case 'GET_PAYMENT_HISTORY': {
            return {...state, chitPayment : action.payload}
        }
        default:{
            return {...state}
        }
    }
}

export default paymentReducer 
    ;