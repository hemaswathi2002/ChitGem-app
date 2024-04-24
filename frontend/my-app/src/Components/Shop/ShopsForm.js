import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startCreateShop, startUpdateShop } from '../Actions/shops';
import { useNavigate } from 'react-router-dom';

export default function ShopsForm({ editId, toggle }) {
    const [shopName, setShopName] = useState('');
    const [area, setArea] = useState('');
    const [pincode, setPincode] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [description, setDescription] = useState('');
    const [approvalStatus, setApprovalStatus] = useState('pending');
    const [formErrors, setFormErrors] = useState({});
    const [serverErrors, setServerErrors] = useState([]);

    const dispatch = useDispatch();

    const shops = useSelector((state) => state.shops);

    useEffect(() => {
        if (editId) {
            const shop = shops?.data.find((ele) => ele._id === editId);
            if (shop) {
                setShopName(shop.shopName || '');
                setArea(shop.address?.area || '');
                setPincode(shop.address?.pincode || '');
                setCity(shop.address?.city || '');
                setState(shop.address?.state || '');
                setEmail(shop.contact?.email || '');
                setMobile(shop.contact?.mobile || '');
                setDescription(shop.description || '');
                setApprovalStatus(shop.approvalStatus || 'pending');
            }
        }
    }, [editId, shops]);

    const navigate = useNavigate();

    const validateErrors = () => {
        const errors = {};

        if (!shopName) {
            errors.shopName = 'Shop Name is required';
        }
        if (!area) {
            errors.area = 'Area is required';
        }
        if (!pincode) {
            errors.pincode = 'Pincode is required';
        }
        if (!city) {
            errors.city = 'City is required';
        }
        if (!state) {
            errors.state = 'State is required';
        }
        if (!email) {
            errors.email = 'Email is required';
        }
        if (!mobile) {
            errors.mobile = 'Mobile is required';
        }
        if (!description) {
            errors.description = 'Description is required';
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateErrors()) return;

        const formData = {
            shopName,
            address: {
                area,
                pincode,
                city,
                state,
            },
            contact: {
                mobile,
                email,
            },
            description,
            approvalStatus,
        };

    
        try {
            if (editId) {
                await dispatch(startUpdateShop(editId, formData));
            } else {
                await dispatch(startCreateShop(formData));
            }
            toggle();
            dispatch(setServerErrors([]));
        }
        catch (err) {
            if (err.response && err.response.data && err.response.data.errors) {
                setServerErrors(err.response.data.errors);
            } else {
                console.log(err);
            }
        }
    };

    return (
        <div>
            {serverErrors && serverErrors.length > 0 && (
                <div>
                    {serverErrors && serverErrors.map((error, index) => (
                        <p key={index} style={{ color: 'red' }}>
                            {error.msg}
                        </p>
                    ))}
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Shop Name:
                        <input
                            type="text"
                            value={shopName}
                            className="form-control"
                            onChange={(e) => setShopName(e.target.value)}
                        />
                    </label>
                    {formErrors.shopName && <p style={{ color: 'red' }}>{formErrors.shopName}</p>}
                    {serverErrors.find((error) => error.param === 'shopName') && (
                        <p style={{ color: 'red' }}>
                            Server Error: {serverErrors.find((error) => error.param === 'shopName').msg}
                        </p>
                    )}
                </div>

                <div>
                    <label>
                        Area:
                        <input
                            type="text"
                            value={area}
                            className="form-control"
                            onChange={(e) => setArea(e.target.value)}
                        />
                    </label>
                    {formErrors.area && <p style={{ color: 'red' }}>{formErrors.area}</p>}
                    {serverErrors.find((error) => error.param === 'area') && (
                        <p style={{ color: 'red' }}>
                            Server Error: {serverErrors.find((error) => error.param === 'area').msg}
                        </p>
                    )}
                </div>

                <div>
                    <label>
                        Pincode:
                        <input
                            type="number"
                            value={pincode}
                            className="form-control"
                            onChange={(e) => setPincode(e.target.value)}
                        />
                    </label>
                    {formErrors.pincode && <p style={{ color: 'red' }}>{formErrors.pincode}</p>}
                    {serverErrors.find((error) => error.param === 'pincode') && (
                        <p style={{ color: 'red' }}>
                            Server Error: {serverErrors.find((error) => error.param === 'pincode').msg}
                        </p>
                    )}
                </div>

                <div>
                    <label>
                        City:
                        <input
                            type="text"
                            value={city}
                            className="form-control"
                            onChange={(e) => setCity(e.target.value)}
                        />
                    </label>
                    {formErrors.city && <p style={{ color: 'red' }}>{formErrors.city}</p>}
                    {serverErrors.find((error) => error.param === 'city') && (
                        <p style={{ color: 'red' }}>
                            Server Error: {serverErrors.find((error) => error.param === 'city').msg}
                        </p>
                    )}
                </div>

                <div>
                    <label>
                        State:
                        <input
                            type="text"
                            value={state}
                            className="form-control"
                            onChange={(e) => setState(e.target.value)}
                        />
                    </label>
                    {formErrors.state && <p style={{ color: 'red' }}>{formErrors.state}</p>}
                    {serverErrors.find((error) => error.param === 'state') && (
                        <p style={{ color: 'red' }}>
                            Server Error: {serverErrors.find((error) => error.param === 'state').msg}
                        </p>
                    )}
                </div>

                <div>
                    <label>
                        Email:
                        <input
                            type="text"
                            value={email}
                            className="form-control"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </label>
                    {formErrors.email && <p style={{ color: 'red' }}>{formErrors.email}</p>}
                    {serverErrors.find((error) => error.param === 'email') && (
                        <p style={{ color: 'red' }}>
                            Server Error: {serverErrors.find((error) => error.param === 'email').msg}
                        </p>
                    )}
                </div>

                <div>
                    <label>
                        Mobile:
                        <input
                            type="text"
                            value={mobile}
                            className="form-control"
                            onChange={(e) => setMobile(e.target.value)}
                        />
                    </label>
                    {formErrors.mobile && <p style={{ color: 'red' }}>{formErrors.mobile}</p>}
                    {serverErrors.find((error) => error.param === 'mobile') && (
                        <p style={{ color: 'red' }}>
                            Server Error: {serverErrors.find((error) => error.param === 'mobile').msg}
                        </p>
                    )}
                </div>

                <div>
                    <label>
                        Description:
                        <input
                            type="text"
                            value={description}
                            className="form-control"
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </label>
                    {formErrors.description && <p style={{ color: 'red' }}>{formErrors.description}</p>}
                    {serverErrors.find((error) => error.param === 'description') && (
                        <p style={{ color: 'red' }}>
                            Server Error: {serverErrors.find((error) => error.param === 'description').msg}
                        </p>
                    )}
                </div>

                <div>
                    <label>
                        Approval Status:
                        <select value={approvalStatus} onChange={(e) => setApprovalStatus(e.target.value)}>
                            <option value="pending">Pending</option>
                            <option value="rejected">Rejected</option>
                            <option value="approved">Approved</option>
                        </select>
                    </label>
                    {formErrors.approvalStatus && <p style={{ color: 'red' }}>{formErrors.approvalStatus}</p>}
                    {serverErrors.find((error) => error.param === 'approvalStatus') && (
                        <p style={{ color: 'red' }}>
                            Server Error: {serverErrors.find((error) => error.param === 'approvalStatus').msg}
                        </p>
                    )}
                </div>

                <button type="submit">Submit</button>
            </form>
        </div>
    );
}
