import { useEffect } from "react";
import axios from "axios";
// import { paymentMonth } from "../../../../backend/App/validators/invoice-validation";

export default function Success() {
    useEffect(() => {
        (async () => {
            try {
                const stripeId = localStorage.getItem('stripeId');
                const payment = await axios.put(`http://localhost:3099/api/payments/${ stripeId }/success`, { paymentStatus:'successfull' });
            } catch (err) {
                console.log(err);
            }
        })();
    }, []);

    return (
        <div>
            <h1>payment done </h1>
                    </div>
    );
}
