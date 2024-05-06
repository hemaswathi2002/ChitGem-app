import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Form, FormGroup, Label, Input, Button, Container } from 'reactstrap' // Import Reactstrap components
import { useAuth } from '../../Context/AuthrorizeContext'
import { startGetUserDetails } from '../Actions/Users'
import Footer from '../../Components/Footer'

export default function LoginForm(props) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [serverErrors, setServerErrors] = useState([])

    const { loginToast } = props
    const { handleLogin } = useAuth()

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleSubmit = async (e) => {
        e.preventDefault()

        const formData = {
            email,
            password
        }
        try {
            const response = await axios.post('http://localhost:3009/api/login', formData)
            const token = response.data.token
            localStorage.setItem('token', token)
            const responseData = await axios.get('http://localhost:3009/api/users/account', {
                headers: {
                    Authorization: localStorage.getItem('token')
                }
            })
            handleLogin(responseData.data)
            loginToast()
            navigate('/')
            setServerErrors([])
            navigate('/usersControl')
        } catch (err) {
            console.log(err);
            console.log(err);
            if (err.response && err.response.data && err.response.data.errors) {
                const errors = typeof err.response.data.errors === 'string' ? [{ msg: err.response.data.errors }] : err.response.data.errors;
                setServerErrors(errors);
            } else {
                setServerErrors([{ msg: 'Invalid email or password' }]);
            }
        }
    }
    // console.log(serverErrors)


    return (
        <div>
        {/* <div style={{ backgroundColor: '#ffb6c1', height: '25px', width: '100%' }}></div> */}
        <Container style={{ marginTop: '80px', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
          <div style={{ border: '2px solid pink', padding: '20px', borderRadius: '5px', width: '30%' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Log-in</h2>
            <Form onSubmit={handleSubmit}>
    {serverErrors.length > 0 && (
        <div>
            {serverErrors?.map((ele,i)=>{
                return <li key = {i} style = {{color : 'red'}}>{ele.msg}</li>
            })}
        </div>
    )}
    <FormGroup>
        <Label for="email">Email:</Label>
        <Input 
            type="email" 
            id="email" 
            placeholder="Enter email..." 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
        />
    </FormGroup>
    <FormGroup>
        <Label for="password">Password:</Label>
        <Input 
            type="password" 
            id="password" 
            placeholder="Enter password..." 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
        />
    </FormGroup>
    <Button type="submit" style={{ backgroundColor: '#ffb6c1', display: 'block', margin: 'auto' }}>Submit</Button>
    <div style={{ textAlign: 'center', marginTop: '10px' }}>
        <Link to='/forgotpassword'>Forgot Password?</Link>
    </div>
    <div style={{ textAlign: 'center' }}>
        <Link to="/register">Sign Up</Link>
    </div>
</Form>

            </div>
        </Container>
        <Footer/>
        </div>
        
    )
}