import {useState,useEffect} from 'react'
import axios from 'axios'
import { useDispatch,useSelector } from 'react-redux'
import { startGetAllShop } from '../Actions/adminsAction'
import ShopDetails from './ShopDetails'
export default function Admin(){

    const dispatch = useDispatch()

    const allShops = useSelector((state) => state.admin.allShops)
    console.log(" all the shop ",allShops)

    useEffect(()=>{
        dispatch(startGetAllShop())
    },[dispatch])

    return(
        <>
        <ShopDetails/>
        </>
    )
}