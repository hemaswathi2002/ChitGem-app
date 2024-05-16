import axios from 'axios'
import Swal from 'sweetalert2'
import ApprovedShopsTable from '../Shop/ApprovedShopsTable';
const handleStatusChange = () => {
    Swal.fire({
        icon: 'success',
        title: 'Approved',
        confirmButtonText: 'OK',
        confirmButtonColor: '#28a745',
    }).then((result) => {
        if (result) {
            <ApprovedShopsTable/>
        }
    });
}
export const startGetAllShop = () => {
    return async (dispatch) => {
        try{
            const response = await axios.get('http://localhost:3009/api/shops',{
                headers : {
                    Authorization : localStorage.getItem('token')
                }
            })
            console.log(response.data)
            dispatch(setAllShops(response.data))
            if(response.data.approvalStatus === 'approved')
                handleStatusChange()
        }
        catch(err){
            console.log(err)
        }
    }
}

const setAllShops = (data)=>{
    return {
        type : 'SET_ALL_SHOPS',
        payload : data

    }
}

export const startUpdateStatus = (id,status) => {
    return async (dispatch) => {
        try{
            const response = await axios.put(`http://localhost:3009/api/shops/update/${id}`,{ approvalStatus: status },{
                headers : {
                    Authorization : localStorage.getItem('token')
                }
            })
            console.log(response.data)
            dispatch(updateStatus(response.data))
        }
        catch(err){
            console.log(err)
        }
    }
}

const updateStatus = (data) => {
    return {
        type : 'SET_SHOP_STATUS',
        payload : data
    }
}