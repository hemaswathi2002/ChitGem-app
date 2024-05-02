import {useEffect} from 'react'
import { startGetOneCustomer } from '../Actions/customersAction'
import DataTable from 'react-data-table-component';
import { useDispatch,useSelector } from 'react-redux'
export default function CustomerDetails(){
    const customers = useSelector((state) => state.customer.data);

    console.log(customers)
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(startGetOneCustomer())
    },[dispatch])
    const customersArray = Object.keys(customers).map((customerId)=>({
        ...customers[customerId],
        id : customerId
    }))
    const customerNames = customersArray.map((customer) => customer.name).join(', ');

     const columns = [
        {
            name: 'Name',
            selector: row=>row.name
        },
        {
            name: 'Email',
            selector: row => row.contact.email
        },
        {
            name: 'Mobile',
            selector: row => row.contact.mobile
        },
        {
            name: 'Description',
            selector: row => row.description
        },
        {
            name: 'Gold Harvested',
            selector: row => row.goldHarvested
        },
    ];
    return(
            <div>
            {customersArray && customersArray.length > 0 && (
                <DataTable
                title={`Hello! ${customerNames}`}
                columns={columns}
                    data={customersArray}
                />
            )}
        </div>
    )
}