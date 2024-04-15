import {useState,useEffect,useContext} from 'react'
import axios from 'axios'
import { CustomersContext } from '../../Context/CustomersContext'
export default function CustomersForm(props){
    const {customers,customerDispatch} = useContext(CustomersContext)
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [mobile,setMobile] = useState('')
    const [description,setDescription] = useState('')
    const [customer,setCustomer] = useState({})

    const {editId} = props
    console.log(editId)

    useEffect(()=>{
        const customer = customers?.data.find(ele=>ele._id==editId)
        setCustomer(customer)
        if(customer){
            setName(customer.name || '')
            setEmail(customer.contact.email || '')
            setMobile(customer.contact.mobile || '')
            setDescription(customer.description || '')
        }else{
            setName('')
            setEmail('')
            setMobile('')
            setDescription('')
        }
    },[customers,editId])

//     const [form,setForm] = useState(customer ? {
//         name : customer.name,
//         email : customer.contact.email,
//         mobile : customer.contact.mobile,
//         description : customer.description
//     } :{
//     name : '',
//     email : '',
//     mobile : '',
//     description : ''
//     }
//  )

    const handleSubmit = async (e) => {
        e.preventDefault()

        const formData = {
            name : name,
            contact: { 
            email:email,
            mobile:mobile
            },
            description : description
        }
        try{
            if(customer){
                const response = await axios.put(`http://localhost:3009/api/customers/${customer._id}`,formData)
                console.log(response.data)
                customerDispatch({type:'UPDATE_CUSTOMERS', payload : response.data})
                props.toggle()

            }else{
            const response = await axios.post('http://localhost:3009/api/customers',formData)
            console.log(response.data)
            customerDispatch({type:'ADD_CUSTOMERS', payload: response.data})
            setName('')
            setEmail('')
            setMobile('')
            setDescription('')
        }
    }
        catch(err){
            console.log(err)
        }
    }
    return(
        <div>
            <form onSubmit = {handleSubmit}>
                <div>
                <label htmlFor="name">name</label>
                <input type = "text"
                value = {name}
                onChange={(e)=>setName(e.target.value)}
                className='form-control'
                name = 'name'
                id = 'name'
                />
                </div>
                <div>
                <label htmlFor="email">email</label>
                <input type = "email"
                value = {email}
                onChange={(e)=>setEmail(e.target.value)}
                className='form-control'
                name = 'email'
                id = 'email'
                />  
                </div>
                <div>
                <label htmlFor="mobile">mobile</label>
                <input type = "text"
                value = {mobile}
                onChange={(e)=>setMobile(e.target.value)}
                className='form-control'
                name = 'mobile'
                id = 'mobile'
                />  
                </div>
                <div>
                <label htmlFor="description">description</label>
                <input type = "text"
                value = {description}
                onChange= {(e)=>setDescription(e.target.value)}
                className='form-control'
                name = 'description'
                id = 'description'
                />  
                </div>
                <div>
                <input type = 'submit' className='btn btn-primary'/>
                </div>
            </form>
        </div>
    )
}
