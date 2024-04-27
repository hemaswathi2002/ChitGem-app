import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startCreateShop, startUpdateShop, clearServerErrors } from '../Actions/shops'

export default function ShopsForm(props) {
    const [shopName, setShopname] = useState('')
    const [area, setArea] = useState('')
    const [pincode, setPincode] = useState(0)
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [email, setEmail] = useState(0)
    const [mobile, setMobile] = useState('')
    const [description, setDescription] = useState('')
    const [approvalStatus, setApprovalStatus] = useState('pending')
    const [formErrors, setFormErrors] = useState({})
    const [shop,setShop]= useState({})
    const [serverErrors,setServerErrors]=useState([])
    const { editId } = props

    const dispatch = useDispatch()
    // const serverErrors = useSelector((state) => state.shops.serverErrors);
    const shops = useSelector(state => state.shops)


    useEffect(() => {
        setShop(shop)
        if (shops && shops.data) {
            const shopData = shops.data.find((shop) => shop._id === editId)
        if (shopData) {
            setShopname(shopData.shopName || '')
            setArea(shopData.address?.area || '') // Handle optional chaining for nested properties
            setPincode(shopData.address?.pincode || '')
            setCity(shopData.address?.city || '')
            setState(shopData.address?.state || '')
            setEmail(shopData.contact?.email || '')
            setMobile(shopData.contact?.mobile || '')
            setDescription(shopData.description || '')
            setApprovalStatus(shopData.approvalStatus || 'pending')
        }
        else {
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
    }
    }, [shop, editId])

    const validateForm = () => {
        const errors = {}

        if (!shopName.trim()) {
            errors.shopName = 'Shop name is required'
        }

        if (!area.trim()) {
            errors.area = 'Area is required'
        }

        if (!pincode) {
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

        if (!mobile) {
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
            dispatch(clearServerErrors())
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
                        {serverErrors && serverErrors.map((error, index) => (
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


// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { startCreateShop, startUpdateShop, clearServerErrors, setServerErrors } from '../Actions/shops';

// export default function ShopsForm({ editId, toggle }) {
//     const [shopData, setShopData] = useState({
//         shopName: '',
//         area: '',
//         pincode: '',
//         city: '',
//         state: '',
//         email: '',
//         mobile: '',
//         description: '',
//         approvalStatus: 'pending'
//     });
//     const [formErrors, setFormErrors] = useState({});
//     const serverErrors = useSelector(state => state.shops.serverErrors);
//     const dispatch = useDispatch();
//     const shops = useSelector(state => state.shops.data);

//     useEffect(() => {
//         if (editId) {
//             const shopToEdit = shops.find(shop => shop._id === editId);
//             if (shopToEdit) {
//                 setShopData({
//                     shopName: shopToEdit.shopName,
//                     area: shopToEdit.address?.area || '',
//                     pincode: shopToEdit.address?.pincode || '',
//                     city: shopToEdit.address?.city || '',
//                     state: shopToEdit.address?.state || '',
//                     email: shopToEdit.contact?.email || '',
//                     mobile: shopToEdit.contact?.mobile || '',
//                     description: shopToEdit.description || '',
//                     approvalStatus: shopToEdit.approvalStatus || 'pending'
//                 });
//             }
//         }
//     }, [editId, shops]);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setShopData({ ...shopData, [name]: value });
//     };

//     const validateForm = () => {
//         const errors = {};

//         if (!shopData.shopName.trim()) {
//             errors.shopName = 'Shop name is required';
//         }

//         // if (!shopData.area.trim()) {
//         //     errors.area = 'Area is required';
//         // }

//         // if (!shopData.pincode.trim()) {
//         //     errors.pincode = 'Pincode is required';
//         // } else if (isNaN(shopData.pincode)) {
//         //     errors.pincode = 'Pincode must be a number';
//         // }
//         if (!String(shopData.pincode).trim()) { // Convert pincode to string before trim
//             errors.pincode = 'Pincode is required';
//         } else if (isNaN(shopData.pincode)) {
//             errors.pincode = 'Pincode must be a number';
//         }

//         if (!shopData.city.trim()) {
//             errors.city = 'City is required';
//         }

//         if (!shopData.state.trim()) {
//             errors.state = 'State is required';
//         }

//         if (!shopData.email.trim()) {
//             errors.email = 'Email is required';
//         } else if (!/\S+@\S+\.\S+/.test(shopData.email)) {
//             errors.email = 'Email is invalid';
//         }

//         // if (!shopData.mobile.trim()) {
//         //     errors.mobile = 'Mobile number is required';
//         // } else if (isNaN(shopData.mobile)) {
//         //     errors.mobile = 'Mobile number must be a number';
//         // }

//         if (!String(shopData.mobile).trim()) { // Convert mobile to string before trim
//             errors.mobile = 'Mobile number is required';
//         } else if (isNaN(shopData.mobile)) {
//             errors.mobile = 'Mobile number must be a number';
//         }

//         if (!shopData.description.trim()) {
//             errors.description = 'Description is required';
//         }

//         setFormErrors(errors);
//         return Object.keys(errors).length === 0;
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         if (!validateForm()) return;

//         try {
//             if (editId) {
//                 await dispatch(startUpdateShop(editId, shopData));
//             } else {
//                 await dispatch(startCreateShop(shopData));
//             }

//             dispatch(clearServerErrors());
//             toggle();
//         } catch (error) {
//             console.error('Error:', error);
//             if (error.response && error.response.data) {
//                 dispatch(setServerErrors(error.response.data.errors || []));
//             }
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             {serverErrors && serverErrors.length > 0 && (
//                 <div>
//                     {serverErrors.map((error, index) => (
//                         <p key={index} style={{ color: 'red' }}>{error.msg}</p>
//                     ))}
//                 </div>
//             )}

//             <div>
//                 <label>Shop Name:</label>
//                 <input
//                     type="text"
//                     name="shopName"
//                     value={shopData.shopName}
//                     onChange={handleChange}
//                 />
//                 {formErrors.shopName && <p style={{ color: 'red' }}>{formErrors.shopName}</p>}
//             </div>

//             <div>
//                 <label>Area:</label>
//                 <input
//                     type="text"
//                     name="area"
//                     value={shopData.area}
//                     onChange={handleChange}
//                 />
//                 {formErrors.area && <p style={{ color: 'red' }}>{formErrors.area}</p>}
//             </div>

//             <div>
//                 <label>Pincode:</label>
//                 <input
//                     type="text"
//                     name="pincode"
//                     value={shopData.pincode}
//                     onChange={handleChange}
//                 />
//                 {formErrors.pincode && <p style={{ color: 'red' }}>{formErrors.pincode}</p>}
//             </div>

//             <div>
//                 <label>City:</label>
//                 <input
//                     type="text"
//                     name="city"
//                     value={shopData.city}
//                     onChange={handleChange}
//                 />
//                 {formErrors.city && <p style={{ color: 'red' }}>{formErrors.city}</p>}
//             </div>

//             <div>
//                 <label>State:</label>
//                 <input
//                     type="text"
//                     name="state"
//                     value={shopData.state}
//                     onChange={handleChange}
//                 />
//                 {formErrors.state && <p style={{ color: 'red' }}>{formErrors.state}</p>}
//             </div>

//             <div>
//                 <label>Email:</label>
//                 <input
//                     type="text"
//                     name="email"
//                     value={shopData.email}
//                     onChange={handleChange}
//                 />
//                 {formErrors.email && <p style={{ color: 'red' }}>{formErrors.email}</p>}
//             </div>

//             <div>
//                 <label>Mobile:</label>
//                 <input
//                     type="text"
//                     name="mobile"
//                     value={shopData.mobile}
//                     onChange={handleChange}
//                 />
//                 {formErrors.mobile && <p style={{ color: 'red' }}>{formErrors.mobile}</p>}
//             </div>

//             <div>
//                 <label>Description:</label>
//                 <input
//                     type="text"
//                     name="description"
//                     value={shopData.description}
//                     onChange={handleChange}
//                 />
//                 {formErrors.description && <p style={{ color: 'red' }}>{formErrors.description}</p>}
//             </div>

//             {!editId && (
//                 <div>
//                     <label>Approval Status:</label>
//                     <select
//                         name="approvalStatus"
//                         value={shopData.approvalStatus}
//                         onChange={handleChange}
//                     >
//                         <option value="pending">Pending</option>
//                         <option value="rejected">Rejected</option>
//                         <option value="approved">Approved</option>
//                     </select>
//                     {formErrors.approvalStatus && <p style={{ color: 'red' }}>{formErrors.approvalStatus}</p>}
//                 </div>
//             )}

//             <div>
//                 <button type="submit">Submit</button>
//             </div>
//         </form>
//     );
// }
