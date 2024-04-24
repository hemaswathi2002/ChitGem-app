import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startCreateShop, startUpdateShop, setServerErrors } from '../Actions/shops'

export default function ShopsForm(props) {
    const [shopName, setShopname] = useState('')
    const [area, setArea] = useState('')
    const [pincode, setPincode] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [email, setEmail] = useState('')
    const [mobile, setMobile] = useState('')
    const [description, setDescription] = useState('')
    const [approvalStatus, setApprovalStatus] = useState('pending')
    const [formErrors, setFormErrors] = useState({})
    const { editId } = props

    const dispatch = useDispatch()
    const shops = useSelector(state => state.shops)
    const serverErrors = useSelector(state => state.serverErrors)

    useEffect(() => {
        if (shops && shops.data) {
            setShopname(shops.shopName || '')
            setArea(shops.address?.area || '') // Handle optional chaining for nested properties
            setPincode(shops.address?.pincode || '')
            setCity(shops.address?.city || '')
            setState(shops.address?.state || '')
            setEmail(shops.contact?.email || '')
            setMobile(shops.contact?.mobile || '')
            setDescription(shops.description || '')
            setApprovalStatus(shops.approvalStatus || 'pending')
        } else {
            setShopname('')
            setArea('')
            setPincode('')
            setCity('')
            setState('')
            setEmail('')
            setMobile('')
            setDescription('')
            setApprovalStatus('pending')
        }
    }, [shops, editId])

    const validateForm = () => {
        const errors = {}

        if (!shopName.trim()) {
            errors.shopName = 'Shop name is required'
        }

        if (!area.trim()) {
            errors.area = 'Area is required'
        }

        if (!pincode.trim()) {
            errors.pincode = 'Pincode is required'
        } 

        if (!city.trim()) {
            errors.city = 'City is required'
        }

        if (!state.trim()) {
            errors.state = 'State is required'
        }

        if (!email.trim()) {
            errors.email = 'Email is required'
        }

        if (!mobile.trim()) {
            errors.mobile = 'Mobile number is required'
        } 

        if (!description.trim()) {
            errors.description = 'Description is required'
        }

        setFormErrors(errors)
        return Object.keys(errors).length === 0
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!validateForm()) return

        const formData = {
            shopName,
            address: { area, pincode, city, state },
            contact: { mobile, email },
            description,
            approvalStatus
        }

        try {
            if (editId) {
                dispatch(startUpdateShop(editId, formData))
            } else {
                dispatch(startCreateShop(formData))
            }
            resetForm()
        } catch (err) {
            console.error('Error:', err)
            if (err.response && err.response.data) {
                dispatch(setServerErrors(err.response.data.errors || []))
            }
        }
    }

    const resetForm = () => {
        setShopname('')
        setArea('')
        setPincode('')
        setCity('')
        setState('')
        setEmail('')
        setMobile('')
        setDescription('')
        setApprovalStatus('pending')
        setFormErrors({})
    }

    return (
        <>
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
                        type="text"
                        value={shopName}
                        className='form-control'
                        onChange={(e) => setShopname(e.target.value)} />
                    {formErrors.shopName && <p style={{ color: 'red' }}>{formErrors.shopName}</p>}
                </div>

                <div>
                    <label>Area:</label>
                    <input
                        type="text"
                        value={area}
                        className='form-control'
                        onChange={(e) => setArea(e.target.value)} />
                    {formErrors.area && <p style={{ color: 'red' }}>{formErrors.area}</p>}
                </div>

                <div>
                    <label>Pincode:</label>
                    <input
                        type="number"
                        className='form-control'
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value)} />
                    {formErrors.pincode && <p style={{ color: 'red' }}>{formErrors.pincode}</p>}
                </div>

                <div>
                    <label>City:</label>
                    <input
                        type="text"
                        className='form-control'
                        value={city}
                        onChange={(e) => setCity(e.target.value)} />
                    {formErrors.city && <p style={{ color: 'red' }}>{formErrors.city}</p>}
                </div>

                <div>
                    <label>State:</label>
                    <input
                        type="text"
                        className='form-control'
                        value={state}
                        onChange={(e) => setState(e.target.value)} />
                    {formErrors.state && <p style={{ color: 'red' }}>{formErrors.state}</p>}
                </div>

                <div>
                    <label>Email:</label>
                    <input
                        type="text"
                        className='form-control'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} />
                    {formErrors.email && <p style={{ color: 'red' }}>{formErrors.email}</p>}
                </div>

                <div>
                    <label>Mobile:</label>
                    <input
                        type="text"
                        className='form-control'
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)} />
                    {formErrors.mobile && <p style={{ color: 'red' }}>{formErrors.mobile}</p>}
                </div>

                <div>
                    <label>Description:</label>
                    <input
                        type="text"
                        value={description}
                        className='form-control'
                        onChange={(e) => setDescription(e.target.value)} />
                    {formErrors.description && <p style={{ color: 'red' }}>{formErrors.description}</p>}
                </div>

                {!props.editId && (  // Conditionally render the Approval Status field if not editing
                    <div>
                        <label>Approval Status:</label>
                        <select
                            value={approvalStatus}
                            onChange={(e) => setApprovalStatus(e.target.value)}>
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
        </>
    )
}
