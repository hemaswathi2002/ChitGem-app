import { jwtDecode } from "jwt-decode"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Owner from "../OwnerDashboard/Owner"
import Customer from '../CustomerDashboard/Customer'
export default function UsersControl(){
    const navigate=useNavigate()
    const token=localStorage.getItem('token')
    const [role,setRole]=useState(null)
    useEffect(()=>{
        try{
            const {role} = jwtDecode(token)
            if(role ==='admin' || role==='owner' || role==='customer'){
                setRole(role)
            }else{
                console.log("role is invalide please check again login detils")
            }
        }catch(err){
            console.log("something went wrong")
        }
    },[token])
    return (
        <>
           {role ==='admin' ? (
            navigate('/admin')
           ): null}
           {role === 'owner' ? (
            <Owner/>
           ): null}
           {role === "customer" ? (
            <Customer/>
           )
           :null}
        </>
    )
}