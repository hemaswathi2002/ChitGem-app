import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startCreateShop, startUpdateShop, clearServerErrors, setServerErrors } from '../Actions/shops'
import { Form, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../../Context/AuthrorizeContext';


export default function ShopsForm({ editId, toggle }) {
    const [shopData, setShopData] = useState({
        shopName: '',
        contact: { email: '', mobile: '' },
        address: { area: '', city: '', state: '', pincode: '' },
        description: '',
        approvalStatus: 'pending'
    })
    const {user} = useAuth()
    const [formErrors, setFormErrors] = useState({})
    const serverErrors = useSelector(state => state.shops.serverErrors)
    console.log(serverErrors)

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
            setShopData({})
            toggle()
        } catch (error) {
            // console.log('Error:', error)
            if (error.response && error.response.data) {
                dispatch(setServerErrors(error.response.data))
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
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '45vh', marginTop: '10px', paddingTop: '60px' }}>
    <div style={{ border: '2px solid pink', padding: '20px', borderRadius: '5px', width: '100%' }}>
        {serverErrors && serverErrors.length > 0 && (
            <div>
                {serverErrors.map((error, index) => (
                    <Alert key={index} variant="danger">{error.msg}</Alert>
                ))}
            </div>
        )}
    <Form onSubmit={handleSubmit}>

        <Form.Group controlId="formShopName">
            {/* <Form.Label>Shop Name</Form.Label> */}
            <Form.Control type="text" placeholder="Shop Name" name="shopName" value={shopData.shopName} onChange={handleChange} />
            {formErrors.shopName && <Alert variant="danger">{formErrors.shopName}</Alert>}
        </Form.Group><br/>

        <Form.Group controlId="formEmail">
            {/* <Form.Label>Email</Form.Label> */}
            <Form.Control type="email" placeholder="Email" name="contact.email" value={shopData.contact?.email} onChange={handleNestedChange} />
            {formErrors.email && <Alert variant="danger">{formErrors.email}</Alert>}
        </Form.Group><br/>

        <Form.Group controlId="formMobile">
            {/* <Form.Label>Mobile</Form.Label> */}
            <Form.Control type="text" placeholder="Mobile" name="contact.mobile" value={shopData.contact?.mobile} onChange={handleNestedChange} />
            {formErrors.mobile && <Alert variant="danger">{formErrors.mobile}</Alert>}
        </Form.Group><br/>

        <Form.Group controlId="formArea">
            {/* <Form.Label>Area</Form.Label> */}
            <Form.Control type="text" placeholder="Area" name="address.area" value={shopData.address?.area} onChange={handleNestedChange} />
            {formErrors.area && <Alert variant="danger">{formErrors.area}</Alert>}
        </Form.Group><br/>

        <Form.Group controlId="formCity">
            {/* <Form.Label>City</Form.Label> */}
            <Form.Control type="text" placeholder="City" name="address.city" value={shopData.address?.city} onChange={handleNestedChange} />
            {formErrors.city && <Alert variant="danger">{formErrors.city}</Alert>}
        </Form.Group><br/>

        <Form.Group controlId="formState">
            {/* <Form.Label>State</Form.Label> */}
            <Form.Control type="text" placeholder="State" name="address.state" value={shopData.address?.state} onChange={handleNestedChange} />
            {formErrors.state && <Alert variant="danger">{formErrors.state}</Alert>}
        </Form.Group><br/>

        <Form.Group controlId="formPincode">
            {/* <Form.Label>Pincode</Form.Label> */}
            <Form.Control type="text" placeholder="Pincode" name="address.pincode" value={shopData.address?.pincode} onChange={handleNestedChange} />
            {formErrors.pincode && <Alert variant="danger">{formErrors.pincode}</Alert>}
        </Form.Group><br/>

        <Form.Group controlId="formDescription">
            {/* <Form.Label>Description</Form.Label> */}
            <Form.Control type="text" placeholder="Description" name="description" value={shopData.description} onChange={handleChange} />
            {formErrors.description && <Alert variant="danger">{formErrors.description}</Alert>}
        </Form.Group><br/>

        {user.role == 'admin' && !editId &&  (
            <Form.Group controlId="formApprovalStatus">
                {/* <Form.Label>Approval Status</Form.Label> */}
                <Form.Control as="select" name="approvalStatus" value={shopData.approvalStatus} onChange={handleChange}>
                    <option value="pending">Pending</option>
                    <option value="rejected">Rejected</option>
                    <option value="approved">Approved</option>
                </Form.Control>
                {formErrors.approvalStatus && <Alert variant="danger">{formErrors.approvalStatus}</Alert>}
            </Form.Group>
        )}
<br/>
<Button type="submit" style={{ backgroundColor: '#ffb6c1' }}>Submit</Button>
    </Form>
    </div>
    </div>
);

}
