import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function ChitDetails({ chitId }) {
    const [chit, setChit] = useState(null);

    useEffect(() => {
        const fetchChitDetails = async () => {
            if (chitId) {
                console.log("Chit ID:", chitId);

            try {
                const response = await axios.get(`http://localhost:3009/api/chits/${chitId}`, {
                    headers: {
                        Authorization: localStorage.getItem('token')
                    }
                });
                console.log("Chit ID:", chitId);

                setChit(response.data);
            } catch (error) {
                console.log('Error fetching chit details:', error);
            }
        };
    }
        fetchChitDetails();
    }, [chitId]);

    if (!chit) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Chit Details</h2>
            <p>Chit ID: {chit._id}</p>
            <p>Chit Amount: {chit.chitAmount}</p>
            <p>Installments: {chit.installments}</p>
            <p>Total Amount: {chit.totalAmount}</p>
            <p>Start Date: {chit.date?.startDate}</p>
            <p>End Date: {chit.date?.endDate}</p>
            <p>Status: {chit.status}</p>
            <p>Benefits: {chit.benefits}</p>
            <p>Terms and Conditions: {chit.termsAndConditions}</p>
            <p>Gold Price: {chit.goldPrice}</p>
        </div>
    );
}
