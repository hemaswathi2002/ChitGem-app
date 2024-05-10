import React, { useEffect } from 'react'
import { startGetOneCustomer } from '../Actions/customersAction'
import { useDispatch, useSelector } from 'react-redux'

export default function CustomerDetails() {
    const customers = useSelector((state) => state.customer.data);
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(startGetOneCustomer())
    }, [dispatch])

    const customersArray = Object.values(customers);

    return (
        <div style={{ paddingTop: '60px' }}>
            {customersArray.map((customer) => (
                <div key={customer._id} style={{ marginBottom: '20px' }}>
                    <h3>Name: {customer.name}</h3>
                    <h3>Email: {customer.contact.email}</h3>
                    <h3>Mobile: {customer.contact.mobile}</h3>
                    <h3>Address:{customer.address}</h3>
                </div>
            ))}
        </div>
    )
}
