import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import { ChitsContext } from '../../Context/ChitsContext';
import { Form, Button } from "react-bootstrap";


export default function ChitForm(props) {
    const { chits, chitDispatch } = useContext(ChitsContext);

    const [chit, setChit] = useState(null); 
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [chitAmount, setChitAmount] = useState(500);
    const [installments, setInstallments] = useState(12);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [status, setStatus] = useState('');
    const [serverErrors, setServerErrors] = useState([]);
    const [formErrors, setFormErrors] = useState({});

    const { editId } = props;

    useEffect(() => {
        const chit = chits?.data.find(ele => ele._id === editId);
        setChit(chit);
        if (chit) {
            setName(chit.name || '')
            setEmail(chit.email || '')
            setChitAmount(chit.chitAmount || 500);
            setInstallments(chit.installments || 12);
            setStartDate(chit.date.startDate || '');
            setEndDate(chit.date.endDate || '');
            setStatus(chit.status || '');
        } else {
            setChit('')
            setEmail('')
            setChitAmount(500);
            setInstallments(12);
            setStartDate('');
            setEndDate('');
            setStatus('');
        }
    }, [chits, editId]);


    const validateErrors = () => {
        const formErrors = {};
        if (!name) {
          formErrors.name = 'name is required';
        }
        if (!email) {
          formErrors.email = 'name is required';
        }
        if (!chitAmount) {
            formErrors.chitAmount = 'Chit Amount is required';
        }
        if (!installments) {
            formErrors.installments = 'Installments is required';
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
                name, 
                email,
                chitAmount,
                installments,
                date: {
                    startDate: formattedStartDate,
                    endDate: formattedEndDate
                },
                status
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
                    props.toggle()
                    setName('')
                    setEmail('')
                    setChitAmount(500);
                    setInstallments(12);
                    setStartDate('');
                    setEndDate('');
                    setStatus('');
                    setServerErrors([]);
                    setFormErrors({});
                }
            } catch (err) {
                if (err.response && err.response.data && err.response.data.errors) {
                    setServerErrors(err.response.data.errors);
                } else {
                    console.log(err);
                }
            }
        }
    };


  
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '45vh', marginTop: '10px' }}>
            <div style={{ border: '2px solid pink', padding: '20px', borderRadius: '5px', width: '30%' }}>

                    <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Add Chit</h2>
        <div>
          {serverErrors.length > 0 && (
            <div>
              {serverErrors.map((error, index) => (
                <p key={index} style={{ color: "red" }}>
                  {error.msg}
                </p>
              ))}
            </div>
          )}
          <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {serverErrors.name && (
                <p style={{ color: "red" }}>{serverErrors.name}</p>
              )}
              {formErrors.installments && (
                <p style={{ color: "red" }}>{formErrors.name}</p>
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>email</Form.Label>
              <Form.Control
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {serverErrors.chitAmount && (
                <p style={{ color: "red" }}>{serverErrors.email}</p>
              )}
              {formErrors.chitAmount && (
                <p style={{ color: "red" }}>{formErrors.email}</p>
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="chitAmount">
              <Form.Label>Chit Amount:</Form.Label>
              <Form.Control
                type="text"
                value={chitAmount}
                onChange={(e) => setChitAmount(e.target.value)}
              />
              {serverErrors.chitAmount && (
                <p style={{ color: "red" }}>{serverErrors.chitAmount}</p>
              )}
              {formErrors.chitAmount && (
                <p style={{ color: "red" }}>{formErrors.chitAmount}</p>
              )}
            </Form.Group>
    
            <Form.Group className="mb-3" controlId="installments">
              <Form.Label>Installments:</Form.Label>
              <Form.Control
                type="text"
                value={installments}
                onChange={(e) => setInstallments(e.target.value)}
              />
              {serverErrors.installments && (
                <p style={{ color: "red" }}>{serverErrors.installments}</p>
              )}
              {formErrors.installments && (
                <p style={{ color: "red" }}>{formErrors.installments}</p>
              )}
            </Form.Group>
    
            <Form.Group className="mb-3" controlId="startDate">
              <Form.Label>Start Date:</Form.Label>
              <Form.Control
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
              {serverErrors.startDate && (
                <p style={{ color: "red" }}>{serverErrors.startDate}</p>
              )}
              {formErrors.startDate && (
                <p style={{ color: "red" }}>{formErrors.startDate}</p>
              )}
            </Form.Group>
    
            <Form.Group className="mb-3" controlId="endDate">
              <Form.Label>End Date:</Form.Label>
              <Form.Control
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
              {serverErrors.endDate && (
                <p style={{ color: "red" }}>{serverErrors.endDate}</p>
              )}
              {formErrors.endDate && (
                <p style={{ color: "red" }}>{formErrors.endDate}</p>
              )}
            </Form.Group>
    
            <Form.Group className="mb-3" controlId="status">
              <Form.Label>Status:</Form.Label>
              <Form.Select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="">Select Status</option>
                <option value="active">Active</option>
                <option value="closed">Closed</option>
              </Form.Select>
              {serverErrors.status && (
                <p style={{ color: "red" }}>{serverErrors.status}</p>
              )}
              {formErrors.status && (
                <p style={{ color: "red" }}>{formErrors.status}</p>
              )}
            </Form.Group>  
            <Button type="submit" style={{ backgroundColor: '#ffb6c1' }}>Submit</Button>

          </Form>
          </div>
          </div>
        </div>
      )
}