import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../header/header';
import img from '../homeimg/Jewellery_Banner_AH_1920.jpg';

export default function LiveGoldPriceDisplay() {
    const [goldPrice, setGoldPrice] = useState(null);

    const fetchGoldPrice = async () => {
        try {
            // const response = await axios.get('http://localhost:3009/api/gold-price');
            // const goldPrice = response.data.goldPrice;
            // console.log("Fetched Gold Price:", goldPrice);
            // setGoldPrice(goldPrice);
        } catch (error) {
            console.error('Error fetching gold price:', error);
            console.log('Error fetching gold price:', error);
        }
    };

    useEffect(() => {
        const intervalId = setInterval(fetchGoldPrice, 2000);

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    useEffect(() => {
        fetchGoldPrice();
    }, []);

    return (
<div className="gold-price-container" style={{ position: 'fixed', left: 0, right: 0, display: 'flex', flexDirection: 'row' }}>
                <div className="moving-strip" style={{ padding: '25px', whiteSpace: 'nowrap' }}>
                    <div className="moving-text">
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
         
            <div style={{ flexGrow: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: '470px',paddingTop: '350px' }}>
                    <img src={img} alt="Jewellery Banner" className="banner-image" style={{ width: '100vw' }} />
                </div>
            </div>
        </div>
    );
}
