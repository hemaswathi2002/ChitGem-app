import axios from 'axios';
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState, useContext } from 'react';
import { ChitsContext } from '../../Context/ChitsContext';

export default function ChitForm(props) {
    const { chits, chitDispatch } = useContext(ChitsContext);

    const [chit, setChit] = useState(null); // Initialize with null instead of {}
    const [chitAmount, setChitAmount] = useState(500);
    const [installments, setInstallments] = useState(12);
    const [totalAmount, setTotalAmount] = useState(0);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [status, setStatus] = useState('');
    const [benefits, setBenefits] = useState('');
    const [termsAndConditions, setTermsAndConditions] = useState('');
    const [serverErrors, setServerErrors] = useState([]);
    const [formErrors, setFormErrors] = useState({});

    const { editId } = props;

    useEffect(() => {
        const chit = chits?.data.find(ele => ele._id === editId);
        setChit(chit);
        if (chit) {
            setChitAmount(chit.chitAmount || 500);
            setInstallments(chit.installments || 12);
            setTotalAmount(chit.totalAmount || 0);
            setStartDate(chit.date.startDate || '');
            setEndDate(chit.date.endDate || '');
            setStatus(chit.status || '');
            setBenefits(chit.benefits || '');
            setTermsAndConditions(chit.termsAndConditions || '');
        } else {
            setChitAmount(500);
            setTotalAmount('');
            setInstallments(12);
            setStartDate('');
            setEndDate('');
            setStatus('');
            setBenefits('');
            setTermsAndConditions('');
        }
    }, [chits, editId]);

    const navigate = useNavigate();

    const validateErrors = () => {
        const formErrors = {};

        if (!chitAmount) {
            formErrors.chitAmount = 'Chit Amount is required';
        }
        if (!installments) {
            formErrors.installments = 'Installments is required';
        }
        if (!totalAmount) {
            formErrors.totalAmount = 'Total Amount is required';
        }
        if (!startDate) {
            formErrors.startDate = 'Start Date is required';
        }
        if (!endDate) {
            formErrors.endDate = 'End Date is required';
        }
        if (!status) {
            formErrors.status = 'Status is required';
        }
        if (!benefits) {
            formErrors.benefits = 'Benefits is required';
        }
        if (!termsAndConditions) {
            formErrors.termsAndConditions = 'Terms and Conditions is required';
        }

        setFormErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = validateErrors();

        if (isValid) {
            const formattedStartDate = new Date(startDate).toISOString().split('T')[0];
            const formattedEndDate = new Date(endDate).toISOString().split('T')[0];
            const formData = {
                chitAmount,
                installments,
                totalAmount,
                date: {
                    startDate: formattedStartDate,
                    endDate: formattedEndDate
                },
                status,
                benefits,
                termsAndConditions
            };

            try {
                if (editId) {
                    const response = await axios.put(`http://localhost:3009/api/chits/${editId}`, formData,{
                        headers : {
                            Authorization : localStorage.getItem('token')
                        }
                    });
                    chitDispatch({ type: 'UPDATE_CHIT', payload: response.data });
                    props.toggle();
                } else {
                    const response = await axios.post('http://localhost:3009/api/chits', formData,{
                        headers : {
                            Authorization : localStorage.getItem('token')
                        }
                    });
                    chitDispatch({ type: 'ADD_CHIT', payload: response.data });
                    setChitAmount(500);
                    setInstallments(12);
                    setTotalAmount(0);
                    setStartDate('');
                    setEndDate('');
                    setStatus('');
                    setBenefits('');
                    setTermsAndConditions('');
                    setServerErrors([]);
                    setFormErrors({});
                }
            } catch (err) {
                if (err.response && err.response.data && err.response.data.errors) {
                    setServerErrors(err.response.data.errors);
                } else {
                    // If there's a generic server error, log it to console
                    console.log(err);
                }
            }
        }
    };


    return (
        <div>
      {serverErrors.length > 0 && (
    <div>
        {serverErrors.map((error, index) => (
            <p key={index} style={{ color: 'red' }}>{error.msg}</p>
        ))}
    </div>
)}
            <form onSubmit={handleSubmit}>
                <div>
               
    <label>
        Chit Amount:
        <input type="text" value={chitAmount} readOnly onChange={(e) => setChitAmount(e.target.value)} />
    </label>
    {serverErrors.chitAmount && <p style={{ color: 'red' }}>{serverErrors.chitAmount}</p>}

    {formErrors.chitAmount && <p style={{ color: 'red' }}>{formErrors.chitAmount}</p>}
                </div>
                <div>
                    <label>
                        Installments:
                        <input type="text" value={installments} readOnly onChange={(e) => setInstallments(e.target.value)} />
                    </label>
                    {serverErrors.installments && <p style={{ color: 'red' }}>{serverErrors.installments}</p>}

                    {formErrors.installments && <p style={{ color: 'red' }}>{formErrors.installments}</p>}
                </div>
                <div>
                    <label>
                        Total Amount:
                        <input type="text" value={totalAmount} onChange={(e) => setTotalAmount(e.target.value)} />
                    </label>
                    {serverErrors.totalAmount && <p style={{ color: 'red' }}>{serverErrors.totalAmount}</p>}

                    {formErrors.totalAmount && <p style={{ color: 'red' }}>{formErrors.totalAmount}</p>}
                </div>
                <div>
                    <label>
                        Start Date:
                        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                    </label>
                    {serverErrors.startDate && <p style={{ color: 'red' }}>{serverErrors.startDate}</p>}

                    {formErrors.startDate && <p style={{ color: 'red' }}>{formErrors.startDate}</p>}
                </div>
                <div>
                    <label>
                        End Date:
                        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                    </label>
                    {serverErrors.endDate && <p style={{ color: 'red' }}>{serverErrors.endDate}</p>}

                    {formErrors.endDate && <p style={{ color: 'red' }}>{formErrors.endDate}</p>}
                </div>
                <div>
                    <label>
                        Status:
                        <select value={status} onChange={(e) => setStatus(e.target.value)}>
                        <option value="">select status</option>
                            <option value="active">Active</option>
                            <option value="closed">Closed</option>
                        </select>
                    </label>
                    {serverErrors.status && <p style={{ color: 'red' }}>{serverErrors.status}</p>}

                    {formErrors.status && <p style={{ color: 'red' }}>{formErrors.status}</p>}
                </div>
                <div>
                    <label>
                        Benefits:
                        <input type="text" value={benefits} onChange={(e) => setBenefits(e.target.value)} />
                    </label>
                    {serverErrors.benefits && <p style={{ color: 'red' }}>{serverErrors.benefits}</p>}

                    {formErrors.benefits && <p style={{ color: 'red' }}>{formErrors.benefits}</p>}
                </div>
                <div>
                    <label>
                        Terms and Conditions:
                        <input type="text" value={termsAndConditions} onChange={(e) => setTermsAndConditions(e.target.value)} />
                    </label>

                    {serverErrors.termsAndConditions && <p style={{ color: 'red' }}>{serverErrors.termsAndConditions}</p>}

                    {formErrors.termsAndConditions && <p style={{ color: 'red' }}>{formErrors.termsAndConditions}</p>}
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}