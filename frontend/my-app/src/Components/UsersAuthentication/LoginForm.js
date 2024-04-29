import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Form, FormGroup, Label, Input, Button, Container } from 'reactstrap' // Import Reactstrap components
import { useAuth } from '../../Context/AuthrorizeContext'
import { startGetUserDetails } from '../Actions/Users'

export default function LoginForm(props) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [serverErrors, setServerErrors] = useState('')

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
            console.log(err)
            setServerErrors(err.response.data.errors)
        }
    }

    return (
        <div>
        <div style={{ backgroundColor: '#ffb6c1', height: '150px', width: '100%' }}></div>
        <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
          <div style={{ border: '2px solid pink', padding: '20px', borderRadius: '5px', width: '30%' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Log-in</h2>
         <Form onSubmit={handleSubmit}>
                {serverErrors.length>0 && (
                             <div style={{ color: 'red' }}>
                    {serverErrors}
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
                <Button type="submit" style={{ backgroundColor: '#ffb6c1' }}>Submit</Button>
                <div>
                    <Link to='/forgotpassword'>Forgot Password?</Link>
                </div>
                <div>
                    <Link to="/signup">Sign Up</Link>
                </div>
            </Form>
            </div>
        </Container>
        </div>
    )
}