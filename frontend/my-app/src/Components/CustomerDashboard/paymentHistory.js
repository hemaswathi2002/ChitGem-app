import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startGetPaymentHistory } from "../Actions/customersAction";

export default function PaymentHistory() {
    const dispatch = useDispatch();
    const [pdfUrls, setPdfUrls] = useState({});
    const paymentHistory = useSelector((state) => {
        return state.payment.chitPayment;
    });

    useEffect(() => {
        dispatch(startGetPaymentHistory());
    }, [dispatch]);

    const formatDateTime = (dateTimeString) => {
        const dateTime = new Date(dateTimeString);
        const formattedDate = dateTime.toLocaleDateString();
        const formattedTime = dateTime.toLocaleTimeString();
        return {
            date: formattedDate,
            time: formattedTime,
        };
    };

    const generatePdf = async (paymentId) => {
        try {
            const response = await fetch(`/api/payments/${paymentId}/pdf`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/pdf',
                },
            });
            console.log(response)
            const blob = await response.blob();
            const pdfUrl = URL.createObjectURL(blob);
            setPdfUrls((prevUrls) => ({ ...prevUrls, [paymentId]: pdfUrl }))
        } catch (err) {
            console.error('Failed to generate PDF:', err);
        }
    };
    console.log(pdfUrls)

    return (
        <>
            <div style={{ paddingTop: '70px' }}>
                <table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Time</th>
                            <th>TransactionId</th>
                            <th>GoldPrice</th>
                            <th>GoldHarvested</th>
                            <th>Payment Type</th>
                            <th>Amount</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paymentHistory.map((ele) => {
                            return (
                                <tr key={ele._id}>
                                    <td>{formatDateTime(ele.paymentDate).date}</td>
                                    <td>{formatDateTime(ele.paymentDate).time}</td>
                                    <td>{ele.transactionId}</td>
                                    <td>{ele.goldPrice}</td>
                                    <td>{ele.goldHarvested}</td>
                                    <td>{ele.paymentType}</td>
                                    <td>{ele.amount}</td>
                                    <td>{ele.paymentStatus}</td>
                                    <td>
                                        <button onClick={() => generatePdf(ele._id)}>Download PDF</button>
                                        {pdfUrls[ele._id] && (
                                            <a href={pdfUrls[ele._id]} target="_blank" rel="noopener noreferrer">
                                                Download PDF for Transaction {ele.transactionId}
                                            </a>
                                        )}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </>
    );
}
