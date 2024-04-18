import {useState,useContext} from 'react'
import axios from 'axios'
import { useNavigate,Link} from 'react-router-dom'
import { UsersContext } from './Context/UsersContext'
// import ShopForm from './Components/Shop/ShopsForm'
export default function LoginForm(props){
    const {users,usersDispatch} = useContext(UsersContext)
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [serverErrors,setServerErrors] = useState([])

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
            usersDispatch({type:'SIGN_IN',payload : true});
            setServerErrors([])
            navigate('/shops')
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
            </form>
        </div>
    )
}