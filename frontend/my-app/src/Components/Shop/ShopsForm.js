import {useEffect,useState,useContext} from 'react'
import axios from 'axios';
import {Link,useNavigate} from 'react-router-dom'
import CustomersForm from '../Customer/CustomersForm';
const { ShopsContext } = require('../../Context/ShopsContext');

export default function ShopsForm(props) {
    const {shops, shopDispatch} = useContext(ShopsContext);
    const [shopName, setShopname] = useState('');
    const [area, setArea] = useState('');
    const [pincode, setPincode] = useState(0);
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [description, setDescription] = useState('');
    const [approvalStatus, setApprovalStatus] = useState('pending');
    const [shop, setShop] = useState({});
    const { editId } = props;

    const navigate = useNavigate()

    useEffect(() => {
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
    }, [shops, editId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
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
            if (shop) {
                const response = await axios.put(`http://localhost:3009/api/shops/${shop._id}`, formData);
                console.log(response.data);
                shopDispatch({ type: 'UPDATE_SHOP', payload: response.data })
                props.toggle();
            } else {
                const response = await axios.post('http://localhost:3009/api/shops', formData);
                console.log(response.data);
                console.log(formData);

                shopDispatch({ type: 'ADD_SHOP', payload: response.data });
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
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Shop Name:
                <input type="text" value={shopName} onChange={(e) => setShopname(e.target.value)} />
            </label>
            <label>
                Area:
                <input type="text" value={area} onChange={(e) => setArea(e.target.value)} />
            </label>
            <label>
                Pincode:
                <input type="number" value={pincode} onChange={(e) => setPincode(e.target.value)} />
            </label>
            <label>
                City:
                <input type="text" value={city} onChange={(e) => setCity(e.target.value)} />
            </label>
            <label>
                State:
                <input type="text" value={state} onChange={(e) => setState(e.target.value)} />
            </label>
            <label>
            Email:
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
            </label> 
            <label>
            Mobile:
                <input type="text" value={mobile} onChange={(e) => setMobile(e.target.value)} />
            </label>
            <label>
            Description:
                <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
            </label>
            <label>
            ApprovalStatus:
                <select value={approvalStatus} onChange={(e) => setApprovalStatus(e.target.value)}>
                    <option value="pending">Active</option>
                    <option value="rejected">Closed</option>
                    <option value="approved">Approved</option>
                </select>
            </label>
            <button type="submit">Submit</button>
        </form>
    );
}

