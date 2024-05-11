import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Header from '../header/header'

export default function LiveGoldPriceDisplay() {
    const [goldPrice, setGoldPrice] = useState(null)

    // const fetchGoldPrice = async () => {
    //     try {
    //         const response = await axios.get('http://localhost:3009/api/gold-price')
    //         const goldPrice = response.data.goldPrice
    //         console.log("Fetched Gold Price:", goldPrice) // Add this line to log fetched data
    //         setGoldPrice(goldPrice)
    //     } catch (error) {
    //         console.error('Error fetching gold price:', error)
    //         console.log('Error fetching gold price:', error)
    //     }
    // }

    // useEffect(() => {
    //     const intervalId = setInterval(fetchGoldPrice, 200)

    //     return () => {
    //         clearInterval(intervalId)
    //     }
    // }, [])

    // useEffect(() => {
    //     fetchGoldPrice()
    // }, [])

    return (
        <div className="gold-price-container"  >
            <div className="moving-strip"  style = {{padding:'50px'}} >
                {goldPrice !== null ? (
    <div>
    <p style={{ fontSize: '20px' }}>
        !!!Live !!!!Gold Price (per gram 24k): {goldPrice} INR !!!Live !!!!Gold Price (per gram 24k): {goldPrice} INR
    </p>
</div>
                ) : (
                    <div>
                    <p>'Updating gold price...' 'Updating gold price...''Updating gold price...'</p> 
                   
                    </div>
                )}
            </div>
        </div>
    )
}