import axios from 'axios' 

// export const startGetInvoices = () => {
//     return async (dispatch) => {
//         try {
//             const response = await axios.get('http://localhost:3009/api/invoices')
//             dispatch(setInvoices(response.data))
//         } catch(err) {
//             alert(err)
//         }
//     }
// }

// const setInvoices = (data) => {
//     return {
//         type: 'SET_INVOICES',
//         payload: data 
//     }
// }

export const startGenerateInvoice = (chitId) => {
    return async (dispatch) => {
        try {
            const response = await axios.post(`/api/${chitId}/generate-invoice`);
            console.log('Invoice generated:', response.data);            
            dispatch(generateInvoice(response.data))
        } catch(err) {
            alert(err)
        }
    }
}

const generateInvoice = (invoice) => {
    return { 
        type: 'GENERATE_INVOICE',
        payload: invoice
    }
}
export const setServerErrors = (errors) => {
    return { 
        type: "SET_ERRORS",
        payload: errors 
    };
};

export const startGetInvoice = () => {
    return async (dispatch) => {
        try{
            const response = await axios.get('http://localhost:3009/api/invoices')
            console.log('invoice',response.data)
            dispatch(getInvoice(response.data))
        }
        catch(err){
            console.log('error fetching invoices:', err);

        }
    }
}

const getInvoice = (data)=>{
    return {
        type : 'START_GET_INVOICE',
        payload : data
    }
}
