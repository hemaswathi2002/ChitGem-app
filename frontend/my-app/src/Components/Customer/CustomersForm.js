
//customerForm
import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { CustomersContext } from '../../Context/CustomersContext'
import { useAuth } from '../../Context/AuthrorizeContext'
import { Container, Form, Button } from 'react-bootstrap'

export default function CustomersForm(props) {
    const { customers, customerDispatch } = useContext(CustomersContext)
    const { editId, toggle, users = [] } = props

    const initialCustomerState = {
        name: '',
        address : '',
        contact: { email: '', mobile: '' },
        description: ''
    };
    const [customer, setCustomer] = useState(initialCustomerState);

    const [filteredUsers, setFilteredUsers] = useState([])
    const [formErrors, setFormErrors] = useState({})
    const [serverErrors, setServerErrors] = useState([])


    useEffect(() => {
        setFilteredUsers(Array.isArray(users) ? users : []);
    }, []);

    useEffect(() => {
        if (editId) {
            const customer = customers?.data.find(ele => ele._id === editId);
            if (customer) {
                setCustomer(customer);
            }
        } else {
            setCustomer(initialCustomerState);
        }
    }, []);

    const resetForm = () => {
        setCustomer(initialCustomerState);
        setFormErrors({});
        setServerErrors([]);
    }
    const validateForm = () => {
        const errors = {}
    
        if (!customer.name.trim()) {
            errors.name = 'Name is required'
        }
        if (!customer.contact.email.trim()) {
            errors.email = 'Email is required'
        } else if (!/\S+@\S+\.\S+/.test(customer.contact.email)) {
            errors.email = 'Email is invalid'
        }
        if (!customer.contact.mobile) {
            errors.mobile = 'Mobile is required'
        } else if (isNaN(customer.contact.mobile)) {
            errors.mobile = 'Mobile number must be a number'
        }  if (!customer.description.trim()) {
            errors.description = 'Description is required'
        }if (!customer.address.trim()) {
            errors.address = 'address is required'
        }
    
        setFormErrors(errors)
        return Object.keys(errors).length === 0 
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!validateForm()) return
        try {
            let response
            if (editId) {
                response = await axios.put(`http://localhost:3009/api/customers/${editId}`, customer, {
                    headers: {
                        Authorization: localStorage.getItem('token')
                    }
                })
                customerDispatch({ type: 'UPDATE_CUSTOMERS', payload: response.data })
                props.toggle()
            } else {
                response = await axios.post('http://localhost:3009/api/customers', customer, {
                    headers: {
                        Authorization: localStorage.getItem('token')
                    }
                })
                console.log(response.data)
                customerDispatch({ type: 'ADD_CUSTOMERS', payload: response.data })
                props.toggle()
            }
            resetForm();

        } catch (err) {
            if (err.response && err.response.data && err.response.data.errors) {
                setFormErrors(err.response.data.errors)
            } else if (err.response && err.response.data && err.response.data.message) {
                setServerErrors([{ message: err.response.data.message }]) // Store error message as an object
            } else {
                console.log(err)
            }
        }
    }
    
    
    const handleChange = (e) => {
        const { name, value } = e.target

        if (name.includes('.')) {
            const [fieldName, nestedField] = name.split('.')
            setCustomer(prevState => ({
                ...prevState,
                [fieldName]: {
                    ...prevState[fieldName],
                    [nestedField]: value
                }
            }))
        } else {
            setCustomer(prevState => ({
                ...prevState,
                [name]: value
            }))
        }
    }
   
    return (
        <div>
        {/* <div style={{ backgroundColor: '#ffb6c1', height: '25px', width: '100%' }}></div> */}
        <Container style={{ marginTop: '155px', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
          <div style={{ border: '2px solid pink', padding: '20px', borderRadius: '5px', width: '100%' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Add Customer</h2>

            <Form onSubmit={handleSubmit}>
                {serverErrors.length > 0 && (
                    <div>
                        {serverErrors.map((error, index) => (
                            <p key={index} style={{ color: 'red' }}>{error.message}</p>
                        ))}
                    </div>
                )}
               <Form.Group className="mb-3" controlId="name">
    <Form.Label>Name</Form.Label>
    <Form.Control
        type="text"
        placeholder="Name" 
        name="name"
        value={customer.name}
        onChange={handleChange}
    />
    {formErrors.name && <p style={{ color: 'red' }}>{formErrors.name}</p>}
</Form.Group>
<Form.Group className="mb-3" controlId="address">
    <Form.Control
        type="text"
        name="address" 
        placeholder="Address" 
        value={customer.address}
        onChange={handleChange}
        
    />
    {formErrors.email && <p style={{ color: 'red' }}>{formErrors.email}</p>}
</Form.Group>
<Form.Group className="mb-3" controlId="email">
    <Form.Control
        type="text"
        name="contact.email" 
        placeholder="Email" 
        value={customer.contact.email}
        onChange={handleChange}
    />
    {formErrors.email && <p style={{ color: 'red' }}>{formErrors.email}</p>}
</Form.Group>
<Form.Group className="mb-3" controlId="mobile">
    <Form.Control
        type="text"
        placeholder="Mobile" 
        name="contact.mobile" // Add the name attribute
        value={customer.contact.mobile}
        onChange={handleChange}
    />
    {formErrors.mobile && <p style={{ color: 'red' }}>{formErrors.mobile}</p>}
</Form.Group>
{/* <Form.Group className="mb-3" controlId="goldHarvested">
    <Form.Label>Description</Form.Label>
    <Form.Control
        type="text"
        placeholder="goldHarvested" 
        name="description" // Add the name attribute
        value={customer.description}
        onChange={handleChange}
    />
    {formErrors.description && <p style={{ color: 'red' }}>{formErrors.description}</p>}
</Form.Group> */}

                <Button type="submit" style={{ backgroundColor: '#ffb6c1' }}>Submit</Button>
            </Form>
            </div>
        </Container>
        </div>
    );
}