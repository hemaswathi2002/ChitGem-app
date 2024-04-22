import {useEffect,useState,useContext} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { startCreateShop, startUpdateShop, setServerErrors } from '../Actions/shops';

export default function ShopsForm(props) {
    const [shopName, setShopname] = useState('');
    const [area, setArea] = useState('');
    const [pincode, setPincode] = useState();
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [description, setDescription] = useState('');
    const [approvalStatus, setApprovalStatus] = useState('pending');
    const [shop, setShop] = useState({});
    const [formErrors,setFormErrors] = useState({})
    const { editId } = props;

    const dispatch = useDispatch()

    const shops = useSelector((state)=>{
        return state.shops
    })
    const serverErrors = useSelector(state => state.serverErrors);


    useEffect(() => {
        if(shop && shop.data){
        const shop = shops?.data.find(ele => ele._id === editId);
        setShop(shop);
        if (shop) {
            setShopname(shop.shopName || '');
            setArea(shop.area || '');
            setPincode(shop.pincode || 0);
            setCity(shop.status || '');
            setState(shop.state || '');
            setEmail(shop.email || '');
            setMobile(shop.mobile || '');
            setDescription(shop.description || '');
            setApprovalStatus(shop.approvalStatus || 'pending');
            // <Link to = '/customers/form' element ={CustomersForm}/>
            // navigate('/customers/form')
        } 
        
         else {
          setShopname('');
          setArea('');
          setPincode(0);
          setCity('');
          setState('');
          setEmail('');
          setMobile('');
          setDescription('');
          setApprovalStatus('');
         }
        }
    }, [shops, editId]);

    const errors = {}
    const validateForm = () => {

        if (shopName.trim().length==0) {
            errors.shopName = 'required';
        }

        if (area.trim().length==0) {
            errors.area = 'required';
        }
        if (city.trim().length==0) {
            errors.city = 'required';
        }

        if (state.trim().length==0) {
            errors.state = 'required';
        }

        if (email.trim().length==0) {
            errors.email = 'Email is required';
      
        }

        if (mobile.trim().length==0) {
            errors.mobile = 'required';
        }

        if (description.trim().length==0) {
            errors.description = 'required';
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        validateForm()
        const formData = {
          shopName: shopName,
          address: {
              area: area,
              pincode: pincode,
              city: city,
              state: state
              
          },
      
          contact: {
            mobile : mobile,
            email : email
            
          },
          description: description,
          approvalStatus: approvalStatus
        };
        try {
            if (shop && shop._id) {
                dispatch(startUpdateShop(shop,formData))
            } else {
                dispatch(startCreateShop(formData))
                setShopname('');
                setArea('');
                setPincode(0);
                setCity('');
                setState('');
                setEmail('');
                setMobile('');
                setDescription('');
                setApprovalStatus('pending');
            }
        } 
        catch (err) {
            if (err.response && err.response.data) {
                dispatch(setServerErrors(err.response.data.errors || []));
              }         
            } 
    }

    return (
        <>
        <form onSubmit={handleSubmit}>
        {Array.isArray(serverErrors) && serverErrors.length > 0 &&  (
                <div>
                    {serverErrors.map((error, index) => (
                        <p key={index} style={{color : 'red'}}>{error.msg}</p>
                    ))}
                </div>
            ) }
            
            <div>
            <label>Shop Name:</label>
                <input
                 type="text"
                 value={shopName}
                 className='form-control'
                 onChange={(e) => setShopname(e.target.value)} />
            </div>
            {formErrors.shopName && <p style = {{color:'red'}}>{formErrors.shopName}</p>}
            <div>
            <label>Area:</label>
                <input type="text" 
                value={area} 
                className='form-control'
                onChange={(e) => setArea(e.target.value)} />
            </div>
            {formErrors.area && <p style = {{color:'red'}}>{formErrors.area}</p>}
            <div>
            <label>Pincode:</label>
                <input type="number" 
                className='form-control'
                value={pincode} 
                onChange={(e) => setPincode(e.target.value)} />
            </div>
            {formErrors.Pincode && <p style = {{color:'red'}}>{formErrors.Pincode}</p>}
            <div>
            <label>City:</label>
                <input 
                type="text" 
                className='form-control'
                value={city} 
                onChange={(e) => setCity(e.target.value)} />
            
            </div>
            {formErrors.city && <p style = {{color:'red'}}>{formErrors.city}</p>}
            <div>
            <label>State:</label>
                <input 
                type="text"
                className='form-control' 
                value={state} 
                onChange={(e) => setState(e.target.value)} />
            </div>
            {formErrors.state && <p style = {{color:'red'}}>{formErrors.state}</p>}
            <div>
            <label> Email:</label>
                <input type="text"
                className='form-control' 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} />
            </div>
            {formErrors.email && <p style = {{color:'red'}}>{formErrors.email}</p>}
            <div>
            <label>Mobile:</label>
                <input 
                type="text" 
                className='form-control' 
                value={mobile} 
                onChange={(e) => setMobile(e.target.value)} />
            </div>
            {formErrors.mobile && <p style = {{color:'red'}}>{formErrors.mobile}</p>}
            <div>
            <label>Description:</label>
                <input type="text" 
                value={description} 
                className='form-control' 
                onChange={(e) => setDescription(e.target.value)} />
            </div>
            {formErrors.description && <p style = {{color:'red'}}>{formErrors.description}</p>}
            <div>
            <label>ApprovalStatus:</label>
                <select value={approvalStatus} onChange={(e) => setApprovalStatus(e.target.value)}>
                    <option value="pending">pending</option>
                    <option value="rejected">rejected</option>
                    <option value="approved">pending</option>
                </select>
            </div>
            {formErrors.ApprovalStatus && <p style = {{color:'red'}}>{formErrors.ApprovalStatus}</p>}
            <div>
            <button type="submit">Submit</button>
            </div>
        </form>
        </>
    );
}

