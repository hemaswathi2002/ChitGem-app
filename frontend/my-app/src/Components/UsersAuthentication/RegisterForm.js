import { useState } from "react"
import axios from 'axios'
import { useNavigate, Link } from "react-router-dom"
import { Container, Form, Button } from 'react-bootstrap'
import Footer from '../../Components/Footer'
import { useAuth } from "../../Context/AuthrorizeContext"

export default function RegisterForm({ registerToast }) {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [mobile, setMobile] = useState('')
    const [role, setRole] = useState('')
    const [password, setPassword] = useState('')
    const [formErrors, setFormErrors] = useState({})
    const [serverErrors, setServerErrors] = useState([])

    const navigate = useNavigate()
    const {user} = useAuth()

    const errors = {}

    const validateErrors = () => {
        if(username.trim().length === 0){
            errors.username = 'required'
        }
        if(email.trim().length === 0){
            errors.email = 'required'
        }
        if(mobile.trim().length === 0){
            errors.mobile = 'required'
        }
        if(role.trim().length === 0){
            errors.role = 'required'
        }
        if(password.trim().length === 0){
            errors.password = 'required'
        }
        setFormErrors(errors)
        return errors
    }

    const handleSubmit = async (e) => {
        validateErrors()
        e.preventDefault()

        const formData = {
            username,
            email,
            mobile,
            role,
            password
        }
        if(Object.keys(errors).length === 0){
            try {
                const response = await axios.post('http://localhost:3009/api/users/register', formData)
                console.log(response.data)
                setServerErrors([])
                setFormErrors({})
                setUsername('')
                setEmail('')
                setMobile('')
                setRole('')
                setPassword('')
                {user?.role == 'owner'?
                navigate('/login') : 
                navigate('/otp')
                }
                registerToast()
            } catch(err) {
                console.log(err)
                console.log(err.response.data.errors)
                setServerErrors(err.response.data.errors || [{ msg: 'Unknown error occurred' }])
            }
        }
    }

    return (
        <div>
        {/* <div style={{ backgroundColor: '#ffb6c1', height: '10px', width: '100%' }}></div> */}
        <div style={{ marginTop: '80px', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
            <div style={{ border: '2px solid pink', padding: '20px', borderRadius: '5px', width: '30%' }}>

                    <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Sign-up</h2>
                    <div>
                        {Array.isArray(serverErrors) && serverErrors.length > 0 && (
                            <div>
                                {serverErrors.map((error, index) => (
                                    <small key={index} style={{ color: 'red', fontSize: '0.8rem' }}>{error.msg}</small>
                                ))}
                            </div>
                        )}
                    </div>

                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="floatingInputUsername">
                            <Form.Control type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                            {formErrors.username && <small style={{ color: 'red', fontSize: '0.7rem' }}>{formErrors.username}</small>}
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="floatingInputEmail">
                            <Form.Control type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            {formErrors.email && <small style={{ color: 'red', fontSize: '0.7rem' }}>{formErrors.email}</small>}
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="floatingInputMobile">
                            <Form.Control type="text" placeholder="Mobile" value={mobile} onChange={(e) => setMobile(e.target.value)} />
                            {formErrors.mobile && <small style={{ color: 'red', fontSize: '0.7rem' }}>{formErrors.mobile}</small>}
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Role:</Form.Label>
                            <div>
                                <Form.Check
                                    inline
                                    type="radio"
                                    id="owner-role"
                                    label="Owner"
                                    value="owner"
                                    checked={role === 'owner'}
                                    onChange={() => setRole('owner')}
                                />
                                <Form.Check
                                    inline
                                    type="radio"
                                    id="customer-role"
                                    label="Customer"
                                    value="customer"
                                    checked={role === 'customer'}
                                    onChange={() => setRole('customer')}
                                />
                            </div>
                            {formErrors.role && <small style={{ color: 'red', fontSize: '0.7rem' }}>{formErrors.role}</small>}
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="floatingInputPassword">
                            <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                            {formErrors.password && <small style={{ color: 'red', fontSize: '0.7rem' }}>{formErrors.password}</small>}
                        </Form.Group>

                        <div style={{ textAlign: 'center' }}>
                            <Button type="submit" style={{ backgroundColor: '#ffb6c1' }}>Submit</Button>
                        </div>
                        <div style={{ textAlign: 'center', marginTop: '10px' }}>
                            <p>Already have an account? <Link to="/login">Login here</Link></p>
                        </div>
                        <div style={{ textAlign: 'center', marginTop: '10px' }}> 
                            <Link to = '/customers'>Add Customer</Link>
                        </div>

                    </Form>
                    <Footer/>

                </div>     

            </div>
        </div>
    )
}
