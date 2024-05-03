const initialState = {
    data: []
}

export default function invoicesReducer(state = initialState, action) {
    switch(action.type){
        case 'START_GET_INVOICE' : {
            return {...state, data: action.payload }
        }
        case 'GENERATE_VOICE' : {
            return {...state, data: [...state.data, action.payload ]}
        }
        case 'SET_ERRORS':
            return {
                ...state,
                serverErrors: action.payload
            };
        default: {
            return {...state}
        }
    }
}
