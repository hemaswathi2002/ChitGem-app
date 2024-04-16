import axios from 'axios'
import{useNavigate} from "react-router-dom"
const  { useEffect, useState, useContext } = require('react')
const { ChitContext } = require('../../Context/root-contexts')

export default function ChitForm(props) {
    const {chits, chitDispatch} = useContext(ChitContext)

    const [chitAmount, setChitAmount] = useState(500)
    const [installments, setInstallments] = useState(12)
    const [totalAmount, setTotalAmount] = useState(0)
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [status, setStatus] = useState('active')
    const [benefits, setBenefits] = useState('')
    const [termsAndConditions, setTermsAndConditions] = useState('')
    const [chit, setChit] = useState({})
    const[formErrors,setFormErrors]=useState({})
    const[serverErrors,setServerErrors]=useState([])
    const navigate=useNavigate()
    const errors={}
    const validateErrors=()=>{
        if(chitAmount.trim().length==0){
            errors.chitAmount='chitAmount is required'
        }
        if(installments.trim().length==0){
            errors.installments='installements is required'
        }
        if(totalAmount.trim().length==0){
            errors.totalAmount='total Amount is required'
        }
        if(startDate.trim().length==0){
            errors.startDate='startDate  is required'
        }
        if(endDate.trim().length==0){
            errors.endDate='endDate  is required'
        }
        if(status.trim().length==0){
            errors.status='status  is required'
        }
        if(benefits.trim().length==0){
            errors.benefits='benefits  is required'
        }
        if(termsAndConditions.trim().length==0){
            errors.termsAndConditions='termsAndConditions  is required'
        }
    }
    const { editId } = props;

    useEffect(() => {
        const chit = chits?.data.find(ele => ele._id === editId);
        setChit(chit);
        if (chit) {
            setChitAmount(chit.chitAmount || 500);
            setInstallments(chit.installments || 12);
            setTotalAmount(chit.totalAmount || 0);
            setStartDate(chit.date.startDate ? new Date(chit.date.startDate).toISOString().split('T')[0] : ''); // Format start date
            setEndDate(chit.date.endDate ? new Date(chit.date.endDate).toISOString().split('T')[0] : ''); // Format end date
            setStatus(chit.status || 'active');
            setBenefits(chit.benefits || '');
            setTermsAndConditions(chit.termsAndConditions || '');
        } else {
            setChitAmount(500);
            setInstallments(12);
            setTotalAmount(0);
            setStartDate('');
            setEndDate('');
            setStatus('active');
            setBenefits('');
            setTermsAndConditions('');
        }
    }, [chits, editId]);

    const handleSubmit = async (e) => {
        const formattedStartDate = new Date(startDate).toISOString().split('T')[0];
        const formattedEndDate = new Date(endDate).toISOString().split('T')[0];
        e.preventDefault();
        const formData = {
            chitAmount: chitAmount,
            installments: installments,
            totalAmount: totalAmount,
            date: {
                startDate: formattedStartDate,
                endDate: formattedEndDate
            },
            status: status,
            benefits: benefits,
            termsAndConditions: termsAndConditions
        };
        try {
            if (chit) {
                const response = await axios.put(`http://localhost:3009/api/chits/${chit._id}`, formData);
                console.log(response.data);
                chitDispatch({ type: 'UPDATE_CHIT', payload: response.data })
                props.toggle();
            } else {
                const response = await axios.post('http://localhost:3009/api/chits', formData);
                console.log(response.data);
                chitDispatch({ type: 'ADD_CHIT', payload: response.data });
                setChitAmount(500);
                setInstallments(12);
                setTotalAmount(0);
                setStartDate('');
                setEndDate('');
                setStatus('active');
                setBenefits('');
                setTermsAndConditions('');
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div>
            {serverErrors &&  serverErrors.length>0 &&(
                <div> 
                    {serverErrors.map((error,index)=>{
                        <p key={index} style={{color:'red'}}>{error.msg}</p>
                    })}
                </div>
            )}
        <form onSubmit={handleSubmit}>
           <div><label>
                Chit Amount:
                <input type="text" value={chitAmount} onChange={(e) => setChitAmount(e.target.value)} />
            </label></div> 
            {formErrors.chitAmount && <p style={{color:'red'}}>{formErrors.chitAmount}</p>}
            <div><label>
                Installments:
                <input type="text" value={installments} onChange={(e) => setInstallments(e.target.value)} />
            </label></div>
            {formErrors.installments && <p style={{color:'red'}}>{formErrors.installments}</p>}
           <div><label>
                Total Amount:
                <input type="text" value={totalAmount} onChange={(e) => setTotalAmount(e.target.value)} />
            </label></div> 
            {formErrors.totalAmount && <p style={{color:'red'}}>{formErrors.totalAmount}</p>}
            <div><label>
                Start Date:
                <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            </label></div>
            {formErrors.startDate && <p style={{color:'red'}}>{formErrors.startDate}</p>}
            <div>
            <label>
                End Date:
                <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            </label></div>
            {formErrors.endDate && <p style={{color:'red'}}>{formErrors.endDate}</p>}
            <div><label>
                Status:
                <select value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option value="active">Active</option>
                    <option value="closed">Closed</option>
                </select>
            </label></div>
            {formErrors.status && <p style={{color:'red'}}>{formErrors.status}</p>}
            <div>
            <label>
                Benefits:
                <input type="text" value={benefits} onChange={(e) => setBenefits(e.target.value)} />
            </label></div>
            {formErrors.benefits && <p style={{color:'red'}}>{formErrors.benefits}</p>}
            <div><label>
                Terms and Conditions:
                <input type="text" value={termsAndConditions} onChange={(e) => setTermsAndConditions(e.target.value)} />
            </label></div>
            {formErrors.termsAndConditions && <p style={{color:'red'}}>{formErrors.termsAndConditions}</p>}
            <button type="submit">Submit</button>
        </form>
                
        </div>
    );
}