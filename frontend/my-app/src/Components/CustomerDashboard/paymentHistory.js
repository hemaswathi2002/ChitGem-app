import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startGetPaymentHistory } from "../Actions/customersAction";
import { Table, Button } from 'react-bootstrap';
import { PDFViewer, Document, Page, Text, View, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        backgroundColor: '#E4E4E4',
        padding: 10
    },
    table: {
        display: "table",
        width: "auto",
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "maroon",
        borderRadius: 2
    },
    tableRow: {
        flexDirection: "row"
    },
    tableColHeader: {
        width: "50%",
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "maroon",
        backgroundColor: "lightpink",
        padding: 5
    },
    tableCol: {
        width: "50%",
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "maroon",
        padding: 5
    },
    tableCellHeader: {
        margin: "auto",
        fontSize: 12,
        fontWeight: "bold"
    },
    tableCell: {
        margin: "auto",
        fontSize: 10
    }
});

const generatePdfDocument = (payment) => (
    <Document>
        <Page size="A4" style={styles.page}>
          <View>
                <View style={styles.tableRow}>
                    <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>Date/Time</Text>
                    </View>
                    <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>{new Date(payment.paymentDate).toLocaleString()}</Text>
                    </View>
                </View>
                <View style={styles.tableRow}>
                    <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>Transaction ID</Text>
                    </View>
                    <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>{payment.transactionId}</Text>
                    </View>
                </View>
                <View style={styles.tableRow}>
                    <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>Gold Price</Text>
                    </View>
                    <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>{payment.goldPrice}</Text>
                    </View>
                </View>
                <View style={styles.tableRow}>
                    <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>Gold Harvested</Text>
                    </View>
                    <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>{payment.goldHarvested}</Text>
                    </View>
                </View>
                <View style={styles.tableRow}>
                    <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>Payment Type</Text>
                    </View>
                    <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>{payment.paymentType}</Text>
                    </View>
                </View>
                <View style={styles.tableRow}>
                    <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>Amount</Text>
                    </View>
                    <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>{payment.amount}</Text>
                    </View>
                </View>
                <View style={styles.tableRow}>
                    <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>Status</Text>
                    </View>
                    <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>{payment.paymentStatus}</Text>
                    </View>
                </View>
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
            <Table striped bordered hover responsive style={{ border: '2px solid maroon' }}>
                <thead style={{ border: '2px solid maroon', backgroundColor: 'lightpink' }}>
                    <tr>
                        <th style={{ border: '2px solid maroon',backgroundColor: 'lightpink' }}>Date</th>
                        <th style={{ border: '2px solid maroon',backgroundColor: 'lightpink' }}>Time</th>
                        <th style={{ border: '2px solid maroon',backgroundColor: 'lightpink' }}>TransactionId</th>
                        <th style={{ border: '2px solid maroon',backgroundColor: 'lightpink' }}>Shop</th>
                        <th style={{ border: '2px solid maroon',backgroundColor: 'lightpink'}}>GoldPrice</th>
                        <th style={{ border: '2px solid maroon',backgroundColor: 'lightpink' }}>GoldHarvested</th>
                        <th style={{ border: '2px solid maroon',backgroundColor: 'lightpink'}}>Payment Type</th>
                        <th style={{ border: '2px solid maroon',backgroundColor: 'lightpink' }}>Amount</th>
                        <th style={{ border: '2px solid maroon',backgroundColor: 'lightpink' }}>Status</th>
                        <th style={{ border: '2px solid maroon',backgroundColor: 'lightpink'}}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {paymentHistory.map((ele) => (
                        <tr key={ele._id}>
                            <td style={{ border: '2px solid maroon' }}>{new Date(ele.paymentDate).toLocaleDateString()}</td>
                            <td style={{ border: '2px solid maroon' }}>{new Date(ele.paymentDate).toLocaleTimeString()}</td>
                            <td style={{ border: '2px solid maroon' }}>{ele.transactionId}</td>
                            <td style={{ border: '2px solid maroon' }}>{ele.shop}</td>
                            <td style={{ border: '2px solid maroon' }}>{ele.goldPrice}</td>
                            <td style={{ border: '2px solid maroon' }}>{ele.goldHarvested}</td>
                            <td style={{ border: '2px solid maroon' }}>{ele.paymentType}</td>
                            <td style={{ border: '2px solid maroon' }}>{ele.amount}</td>
                            <td style={{ border: '2px solid maroon' }}>{ele.paymentStatus}</td>
                            <td style={{ border: '2px solid maroon' }}>
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
                <div style={{ width: "90%", height: "600px", marginTop: "20px" }}>
                    <PDFViewer width="100%" height="100%">
                        {generatePdfDocument(selectedPayment)}
                    </PDFViewer>
                </div>
            )}
        </div>
    );
}
