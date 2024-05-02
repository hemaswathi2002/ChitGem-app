import {useEffect} from 'react'
export default function CustomerDetails(){
    useEffect(()=>{
        dispatchEvent(startGetOneCustomer(id))
    },[])
    return(
        <div></div>
    )
}