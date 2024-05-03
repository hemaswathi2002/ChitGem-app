import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function LiveGoldPriceDisplay (){
    const [goldPrice, setGoldPrice] = useState(null)

    const fetchGoldPrice = async () => {
        try {
            const response = await axios.get('http://localhost:3009/api/gold-price')
            const GoldPrice = response.data.goldPrice
            console.log("Fetched Gold Price:", GoldPrice); // Add this line to log fetched data
            setGoldPrice(GoldPrice)
        } catch (error) {
            console.log('Error fetching gold price:', error)
        }
    };

    useEffect(() => {
        const intervalId = setInterval(fetchGoldPrice, 60000)

        return () => {
            clearInterval(intervalId)
        };
    }, [])

    useEffect(() => {
        fetchGoldPrice();
    }, []);

    return (
        <div>
            <h2>Live Gold Price</h2>
            {goldPrice !== null ? (
                <p>Gold Price (per gram 24k): {goldPrice} INR</p>
            ) : (
                <p>'Updating gold price...'</p>
            )}
        </div>
    );
};

