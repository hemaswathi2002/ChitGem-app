import { useState,useContext } from "react"
import axios from 'axios'
import { useNavigate, Link } from "react-router-dom"
import { toast } from "react-toastify"
export default function RegisterForm({ registerToast }) {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [mobile, setMobile] = useState('')
    const [role, setRole] = useState('')
    const [password, setPassword] = useState('')
    const [formErrors, setFormErrors] = useState({})
    const [serverErrors, setServerErrors] = useState([])
    

    const navigate = useNavigate()

    const errors ={}

    const validateErrors = () => {

        if(username.trim().length==0){
            errors.username = 'required'
        }
        if(email.trim().length==0){
            errors.email = 'required'

        }
        if(mobile.trim().length==0){
            errors.mobile = 'required'
        }
        if(role.trim().length==0){
            errors.role = 'required'
        }
        if(password.trim().length==0){
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
        if(Object.keys(errors).length==0){
            try{
                const response = await axios.post('http://localhost:3009/api/users/register',formData)
                    console.log(response.data)
                    setServerErrors([])
                    setFormErrors({})
                    setUsername('')
                    setEmail('')
                    setMobile('')
                    setRole('')
                    setPassword('')
                    navigate('/otp')
                    registerToast()
            }
            catch(err){
                console.log(err)
                console.log(err.response.data.errors)
                setServerErrors(err.response.data.errors || [{ msg: 'Unknown error occurred' }])
            }
        }

    }

    return (
        <div>
            {Array.isArray(serverErrors) && serverErrors.length > 0 &&  (
                <div>
                    {serverErrors.map((error, index) => (
                        <p key={index} style={{color : 'red'}}>{error.msg}</p>
                    ))}
                </div>
            ) }
            
            
            <form onSubmit={handleSubmit}>
                <div>
                    <input type='text'
                        placeholder='Enter your name...'
                        value={username}
                        onChange={(e) => { setUsername(e.target.value) }}
                    />
                </div>
                {formErrors.username && <p style = {{color:'red'}}>{formErrors.username}</p>}
                <div>
                    <input type='text'
                        placeholder='Enter email...'
                        value={email}
                        onChange={(e) => { setEmail(e.target.value) }}
                    />
                </div>
                {formErrors.email && <p style = {{color : 'red'}}>{formErrors.email}</p>}
                <div>
                    <input type='number'
                        placeholder='Enter mobile...'
                        value={mobile}
                        onChange={(e) => { setMobile(e.target.value) }}
                    />
                </div>
                {formErrors.mobile && <p style = {{color : 'red'}}>{formErrors.mobile}</p>}
                <div>
                    <select 
                        value={role}
                        onChange={(e)=>{ setRole(e.target.value) }}
                    >
                        <option value=''>select role...</option>
                        <option value='admin'>admin</option>
                        <option value='owner'>owner</option>
                        <option value='customer'>customer</option>
                    </select>
                </div>
                {formErrors.role && <p style = {{color : 'red'}}>{formErrors.role}</p>}
                <div>
                    <input type='password'
                        placeholder='Enter password...'
                        value={password}
                        onChange={(e) => { setPassword(e.target.value) }}
                    />
                </div>
                {formErrors.password && <p style = {{color : 'red'}}>{formErrors.password}</p>}
                <div>
                    <input type='submit' />
                </div>
                <div>
                    <p>Already have an account? <Link to = '/login'>Login here</Link></p>
                </div>
            </form>
        </div>
            
    )
}