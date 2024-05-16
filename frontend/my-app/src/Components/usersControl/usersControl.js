import { jwtDecode } from "jwt-decode"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Owner from "../OwnerDashboard/Owner"
import Customer from '../CustomerDashboard/Customer'
import GoldPriceGraph from '../GoldPriceGraph'
import { useAuth } from "../../Context/AuthrorizeContext"
export default function UsersControl(){
    const navigate=useNavigate()
    const token=localStorage.getItem('token')
    const [role,setRole]=useState(null)
    const {user} = useAuth()
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
           {/* {role ==='admin' ? (
            navigate('/admin')
           ): null} */}
           {/* {role === 'owner' ? (
            <Owner/>
           ): null}
           {role === "customer" ? (
            <Customer/>
           )
           :null} */}
           {/* <LiveGoldPriceDisplay/> */}
           {user?.role == 'owner' ?(
            <GoldPriceGraph/>
           ):null}
            {user?.role == 'customer' ?(
            <GoldPriceGraph/>
           ):null}
           {user?.role == 'admin' ?(
            navigate('/approved-status')
           ):null}
        </>
    )
}