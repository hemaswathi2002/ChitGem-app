import {useState} from 'react'
import axios from 'axios'
import { useNavigate,Link} from 'react-router-dom'
import { useAuth } from './Context/AuthrorizeContext'
// import { UsersContext } from './Context/UsersContext'
// import ShopForm from './Components/Shop/ShopsForm'
export default function LoginForm(props){
    // const {users,usersDispatch} = useContext(UsersContext)
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [serverErrors,setServerErrors] = useState([])
    const { handleLogin} = useAuth() 

    const navigate = useNavigate()

    const handleSubmit = async(e)=>{
        e.preventDefault()

        const formData = {
            email,
            password
        }
        try{
            const response = await axios.post('http://localhost:3009/api/login',formData)
            console.log(response.data.token)
            const token = response.data.token
            localStorage.setItem('token',token)
            const userResponse = await axios.get('http://localhost:3009/api/users/account', { 
                    headers: {
                        Authorization: localStorage.getItem('token')
                    }
                })
                handleLogin(userResponse.data)
                navigate('/')
            // usersDispatch({type:'SIGN_IN',payload : true});
            setServerErrors([])
            
            // navigate('/dashboard')
            // loginToast();
        }
        catch(err){
            console.log(err)
            // console.log(err.response.data.errors)
            setServerErrors(err.response.data.errors)
        }
    }

    return(
        <div>
            {serverErrors && <p style = {{color:'red'}}>{serverErrors}</p>}
            <form onSubmit = {handleSubmit}>
                <h2>Login</h2>
               <div>
               <input type='text'
                placeholder='Enter email...'
                onChange = {(e)=>setEmail(e.target.value)}
                value={email}
                />
                </div>
                <div>
                <input type='password'
                placeholder='Enter password...'
                name = 'password'
                onChange = {(e)=>setPassword(e.target.value)}
                value={password}
                />
                </div>
                <div>
                    <input type = 'submit'/>
                </div>
                <div>
                <Link to = '/forgotpassword'>forgot Password?</Link>
                </div>
                <div>
                <Link to="/signup">Sign Up</Link>
                </div>
            </form>
        </div>
    )
}