import DataTable from 'react-data-table-component'
import {useDispatch, useSelector} from 'react-redux';
import { startUpdateStatus } from '../Actions/adminsAction';
export default function ShopDetails(){
    const allShops = useSelector((state) => {
        console.log("All Shops in useSelector:", state.admin.allShops);
        return state.admin.allShops;
    });
    const dispatch = useDispatch()

    const handleStatusChange = (shopId, status) => {
        if (shopId) {
            dispatch(startUpdateStatus(shopId, status));
        } else {
            console.error('Invalid shop ID:', shopId);
        }
    };
    
    const columns = [
        {
            name: 'Shop',
            selector : row => row.shopName
        },
        {
            name: 'Address',
            cell: row => <div style={{ whiteSpace: 'pre-wrap' }}>{`${row.address.area}, ${row.address.city}, ${row.address.state} ${row.address.pincode}`}</div>
        },
        {
            name: 'email',
            selector : row => row.contact.email
        },
        {
            name: 'mobile',
            selector : row => row.contact.mobile
        },
        {
            name: 'Description',
            cell : row => row.description
        },
        {
            name: 'Status',
            cell: row => (
                <div>
                    {["pending", "rejected", "approved"].map(status => (
                        <div key={status}>
                            <input
                                type="radio"
                                id={`${row._id}-${status}`}
                                name={`${row._id}-approvalStatus`}
                                value={status}
                                checked={row.approvalStatus === status}
                                onChange={(e) => handleStatusChange(row._id, status)}
                            />
                            <label htmlFor={`${row._id}-${status}`}>{status.charAt(0).toUpperCase() + status.slice(1)}</label>
                        </div>
                    ))}
                </div>
            )
        }
    ]

    

    
    return (
        <>
            <h2>Shop List</h2>
            <DataTable
             columns={columns}
             data={allShops}
             pagination
             highlightOnHover
             striped
             responsive
            />
            
        </>
    )
}