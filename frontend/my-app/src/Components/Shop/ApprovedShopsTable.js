import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchApprovedShops } from '../Actions/shops'

const ApprovedShopsTable = () => {
    const dispatch = useDispatch()
const shops = useSelector(state => state.shops.shops)
console.log(shops)
    useEffect(() => {
        dispatch(fetchApprovedShops())
    }, [dispatch])

    return (
        <div>
            <h2>Approved Shops</h2>
            <table className="styled-table">

                <thead style={{ backgroundColor: 'lightpink' }}>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Mobile</th>
                        <th>Area</th>
                        <th>City</th>
                        <th>State</th>
                        <th>Pincode</th>
                        <th>Description</th>
                        <th>Approval Status</th>
                    </tr>
                </thead>
                <tbody>
                {Array.isArray(shops) && shops.map(shop => (
                                            <tr key={shop._id} className="table-row">
                            <td>{shop.shopName}</td>
                            <td>{shop.contact?.email}</td>
                            <td>{shop.contact?.mobile}</td>
                            <td>{shop.address?.area}</td>
                            <td>{shop.address?.city}</td>
                            <td>{shop.address?.state}</td>
                            <td>{shop.address?.pincode}</td>
                            <td>{shop.description}</td>
                            <td>{shop.approvalStatus}</td>
                         
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ApprovedShopsTable
