import { useState,useContext } from "react"
import axios from 'axios'
import { UsersContext } from "../../Context/UsersContext"
import { useNavigate } from "react-router-dom"
export default function RegisterForm() {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [mobile, setMobile] = useState('')
    const [role, setRole] = useState('')
    const [password, setPassword] = useState('')
    const [formErrors, setFormErrors] = useState({})
    const [serverErrors, setServerErrors] = useState([])
    
    const {users,usersDispatch} = useContext(UsersContext)

    const navigate = useNavigate()
    
    const handleSubmit = async (e) => {

        e.preventDefault()

        const formData = {
            username,
            email,
            mobile,
            role,
            password
        }
        try{
            const response = await axios.post('http://localhost:3009/api/users',formData)
                console.log(response.data)
                usersDispatch({type:'SET_USERS',payload:response.data})
        }
        catch(err){
            console.log(err)
        }

    }

    return (
        <div>
            <form onSubmit = {handleSubmit}>
                <div>
                    <input type='text'
                        placeholder='Enter your name...'
                        value={username}
                        onChange={(e) => { setUsername(e.target.value) }}
                    />
                </div>
                <div>
                    <input type='text'
                        placeholder='Enter email...'
                        value={email}
                        onChange={(e) => { setEmail(e.target.value) }}
                    />
                </div>
                <div>
                    <input type='number'
                        placeholder='Enter mobile...'
                        value={mobile}
                        onChange={(e) => { setMobile(e.target.value) }}
                    />
                </div>
                <div>
                    <select 
                    value = {role}
                    onChange = {(e)=>{setRole(e.target.value)}}
                    >
                        <option value = ''>select role...</option>
                        <option value = 'admin'>admin</option>
                        <option value = 'owner'>owner</option>
                        <option value = 'customer'>customer</option>
                    </select>
                </div>
                <div>
                    <input type='text'
                        placeholder='Enter password...'
                        value={password}
                        onChange={(e) => { setPassword(e.target.value) }}
                    />
                </div>
                <div>
                    <input type = 'submit'/>
                </div>
            </form>
        </div>
    )
}