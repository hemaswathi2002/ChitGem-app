import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startGetPaymentHistory } from "../Actions/customersAction";
import { Table, Button } from 'react-bootstrap';
import {PDFViewer, Document, Page, Text, View, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        backgroundColor: '#E4E4E4'
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1
    },
    header: {
        fontSize: 18,
        marginBottom: 10
    },
    content: {
        fontSize: 12
    }
});

const generatePdfDocument = (payment) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.section}>
                <Text style={styles.header}>Payment Details</Text>
                <Text style={styles.content}>Date: {new Date(payment.paymentDate).toLocaleString()}</Text>
                <Text style={styles.content}>Transaction ID: {payment.transactionId}</Text>
                <Text style={styles.content}>Gold Price: {payment.goldPrice}</Text>
                <Text style={styles.content}>Gold Harvested: {payment.goldHarvested}</Text>
                <Text style={styles.content}>Payment Type: {payment.paymentType}</Text>
                <Text style={styles.content}>Amount: {payment.amount}</Text>
                <Text style={styles.content}>Status: {payment.paymentStatus}</Text>
            </View>
        </Page>
    </Document>
);

export default function PaymentHistory() {
    const dispatch = useDispatch();
    const [selectedPayment, setSelectedPayment] = useState(null);
    const paymentHistory = useSelector((state) => state.payment.chitPayment);

    useEffect(() => {
        dispatch(startGetPaymentHistory());
    }, [dispatch]);

    return (
        <div style={{ paddingTop: '70px' }}>
            <Table striped bordered hover responsive>
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
                    {paymentHistory.map((ele) => (
                        <tr key={ele._id}>
                            <td>{new Date(ele.paymentDate).toLocaleDateString()}</td>
                            <td>{new Date(ele.paymentDate).toLocaleTimeString()}</td>
                            <td>{ele.transactionId}</td>
                            <td>{ele.goldPrice}</td>
                            <td>{ele.goldHarvested}</td>
                            <td>{ele.paymentType}</td>
                            <td>{ele.amount}</td>
                            <td>{ele.paymentStatus}</td>
                            <td>
                                <Button variant="primary" onClick={() => setSelectedPayment(ele)}>View PDF</Button>
                                <PDFDownloadLink document={generatePdfDocument(ele)} fileName={`payment_${ele._id}.pdf`}>
                                    {({ blob, url, loading, error }) =>
                                        loading ? 'Loading document...' : 'Download PDF'
                                    }
                                </PDFDownloadLink>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            {selectedPayment && (
                <div style={{ width: "100%", height: "600px", marginTop: "20px" }}>
                    <PDFViewer width="100%" height="100%">
                        {generatePdfDocument(selectedPayment)}
                    </PDFViewer>
                </div>
            )}
        </div>
    )
}

