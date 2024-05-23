const initialState = {
    data: [],
    paymentHistory : [],
    chitPayment : [],
    chitsNotPaidPerMonth :[]
}

export default function invoicesReducer(state = initialState, action) {
    switch(action.type){
        case 'START_GET_INVOICE' : {
            return {...state, data: action.payload }
        }
        case 'GENERATE_VOICE' : {
            return {...state, data: [...state.data, action.payload ]}
        }
        case 'GET_ALL_PAYMENT_HISTORY': {
            return {...state, paymentHistory : action.payload}
        }
        case 'SET_CHIT_TRANSACTION':
            return { ...state, chitPayment: action.payload }
        case 'SET_ERRORS':
            return {
                ...state,
                serverErrors: action.payload
            };
            case 'SET_CHITS_NOT_PAID_PER_MONTH':
            return {...state,chitsNotPaidPerMonth: action.payload}
        default: {
            return {...state}
        }
    }
}
