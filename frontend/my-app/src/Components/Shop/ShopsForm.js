

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startCreateShop, startUpdateShop, clearServerErrors, setServerErrors } from '../Actions/shops'

export default function ShopsForm({ editId, toggle }) {
    const [shopData, setShopData] = useState({
        shopName: '',
        contact: { email: '', mobile: '' },
        address: { area: '', city: '', state: '', pincode: '' },
        description: '',
        approvalStatus: 'pending'
    })
    const [formErrors, setFormErrors] = useState({})
    const serverErrors = useSelector(state => state.shops.serverErrors)
    const shops = useSelector(state => state.shops.shop)
    const dispatch = useDispatch()

    useEffect(() => {
        if (editId) {
            const shopEdit = shops.find(shop => shop._id === editId)
            if (shopEdit) {
                setShopData({
                    shopName: shopEdit.shopName || '',
                    contact: { email: shopEdit.contact.email || '', mobile: shopEdit.contact.mobile || '' },
                    address: { area: shopEdit.address.area || '', city: shopEdit.address.city || '', state: shopEdit.address.state || '', pincode: shopEdit.address.pincode || '' },
                    description: shopEdit.description || '',
                    approvalStatus: shopEdit.approvalStatus || 'pending'
                })
            }
        }
    }, [editId, shops])
// here this is just for normal inout field
    const handleChange = (e) => {
        const { name, value } = e.target
        setShopData(prevShopData => ({
            ...prevShopData,
            [name]: value
        }))
    } 
    //here i have updated for the nested object call this for the jsx in input column
    const handleNestedChange = (e) => {
        const { name, value } = e.target
        const [parent, child] = name.split('.') 
        setShopData(prevShopData => ({
            ...prevShopData,
            [parent]: {
                ...prevShopData[parent], 
                [child]: value 
            }
        }))
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!validateForm()) return

        try {
            if (editId) {
                await dispatch(startUpdateShop(editId, shopData))
            } else {
                await dispatch(startCreateShop(shopData))
            }

            dispatch(clearServerErrors())
            toggle()
        } catch (error) {
            console.error('Error:', error)
            if (error.response && error.response.data) {
                dispatch(setServerErrors(error.response.data.errors || []))
            }
        }
    }

    const validateForm = () => {
        const errors = {}

        if (!shopData.shopName.trim()) {
            errors.shopName = 'Shop name is required'
        }

        if (!shopData.address.area.trim()) {
            errors.area = 'Area is required'
        }

        if (!shopData.address.pincode) {
            errors.pincode = 'Pincode is required'
        } else if (isNaN(shopData.address.pincode)) {
            errors.pincode = 'Pincode must be a number'
        }

        if (!shopData.address.city.trim()) {
            errors.city = 'City is required'
        }

        if (!shopData.address.state.trim()) {
            errors.state = 'State is required'
        }

        if (!shopData.contact.email.trim()) {
            errors.email = 'Email is required'
        } else if (!/\S+@\S+\.\S+/.test(shopData.contact.email)) {
            errors.email = 'Email is invalid'
        }

        if (!shopData.contact.mobile) {
            errors.mobile = 'Mobile number is required'
        } else if (isNaN(shopData.contact.mobile)) {
            errors.mobile = 'Mobile number must be a number'
        }

        if (!shopData.description.trim()) {
            errors.description = 'Description is required'
        }

        setFormErrors(errors)
        return Object.keys(errors).length === 0
    }
//in jsx   in the nname field see  the chnge i have donne 
    return (
        <form onSubmit={handleSubmit}>
            {serverErrors && serverErrors.length > 0 && (
                <div>
                    {serverErrors.map((error, index) => (
                        <p key={index} style={{ color: 'red' }}>{error.msg}</p>
                    ))}
                </div>
            )}

            <div>
                <label>Shop Name:</label>
                <input
                    type="text"Z
                    name="shopName"
                    value={shopData.shopName}
                    onChange={handleChange}
                />
                {formErrors.shopName && <p style={{ color: 'red' }}>{formErrors.shopName}</p>}
            </div>

            <div>
                <label>Email:</label>
                <input
                    type="text"
                    name="contact.email"
                    value={shopData.contact.email}
                    onChange={handleNestedChange}
                />
                {formErrors.email && <p style={{ color: 'red' }}>{formErrors.email}</p>}
            </div>

            <div>
                <label>Mobile:</label>
                <input
                    type="text"
                    name="contact.mobile"
                    value={shopData.contact.mobile}
                    onChange={handleNestedChange}
                />
                {formErrors.mobile && <p style={{ color: 'red' }}>{formErrors.mobile}</p>}
            </div>

            <div>
                <label>Area:</label>
                <input
                    type="text"
                    name="address.area"
                    value={shopData.address.area}
                    onChange={handleNestedChange}
                />
                {formErrors.area && <p style={{ color: 'red' }}>{formErrors.area}</p>}
            </div>

            <div>
                <label>City:</label>
                <input
                    type="text"
                    name="address.city"
                    value={shopData.address.city}
                    onChange={handleNestedChange}
                />
                {formErrors.city && <p style={{ color: 'red' }}>{formErrors.city}</p>}
            </div>

            <div>
                <label>State:</label>
                <input
                    type="text"
                    name="address.state"
                    value={shopData.address.state}
                    onChange={handleNestedChange}
                />
                {formErrors.state && <p style={{ color: 'red' }}>{formErrors.state}</p>}
            </div>

            <div>
                <label>Pincode:</label>
                <input
                    type="text"
                    name="address.pincode"
                    value={shopData.address.pincode}
                    onChange={handleNestedChange}
                />
                {formErrors.pincode && <p style={{ color: 'red' }}>{formErrors.pincode}</p>}
            </div>

            <div>
                <label>Description:</label>
                <input
                    type="text"
                    name="description"
                    value={shopData.description}
                    onChange={handleChange}
                />
                {formErrors.description && <p style={{ color: 'red' }}>{formErrors.description}</p>}
            </div>

            {!editId && (
                <div>
                    <label>Approval Status:</label>
                    <select
                        name="approvalStatus"
                        value={shopData.approvalStatus}
                        onChange={handleChange}
                    >
                        <option value="pending">Pending</option>
                        <option value="rejected">Rejected</option>
                        <option value="approved">Approved</option>
                    </select>
                    {formErrors.approvalStatus && <p style={{ color: 'red' }}>{formErrors.approvalStatus}</p>}
                </div>
            )}

            <div>
                <button type="submit">Submit</button>
            </div>
        </form>
    )
}
