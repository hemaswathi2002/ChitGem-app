// import { useState,useEffect } from "react";
// import{Card,Button} from 'react-bootstrap'
// import axios from 'axios'
// import 'bootstrap/dist/css/bootstrap.min.css'

// export default function Invoices(){
//     const[invoices,setInvoices]=useState([])
//     useEffect(()=>{
//         (async()=>{
//             try{
//                 const response=await axios.get('http://localhost:3009/api/invoices')
//                 setInvoices(response.data)
//             }catch(err){
//                 console.log(err)
//             }
//         })()
//     },[])

//     const makePayment=async(product)=>{
//         try{
//             const body={
//                 invoiceId:Chit._id,
//                 customerName:customer.customerName,
//                 totalAmount:Chit.totalAmount
//             }
//             const response=await axios.post('http://localhost:3099/api/create-checkout-session',body)
//             localStorage.setItem('stripeId',response.data.id)
//             window.location=response.data.url
//         }
//         catch(err){
//             console.log(err)
//         }
//     }
//      return (
//         <div>
//             <br />
//             <div style={{
//                 display: 'flex',
//                 justifyContent: 'center',
//                 alignItems: 'center',
//                 flexDirection: 'column'
//             }}>
//                 <h1>Invoices : {invoices.length}</h1>
//                 {invoices.map(chit => (
//                     <div key={chit.id} className="col-md-4 mb-3">
//                         <Card.Body>
//                             <Card.Title>{customer.customerName}</Card.Title>
//                             <Card.Text>{chit.totalAmount}</Card.Text>
//                             <Button variant="primary" onClick={() => makePayment(chit)}>
//                                 Pay Now
//                             </Button>
//                         </Card.Body>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// }



import React, { useState, useEffect } from "react";
import { Card, Button } from 'react-bootstrap';
import axios from 'axios';
import { Document, Page, Text, View, StyleSheet, PDFViewer } from '@react-pdf/renderer';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Invoices() {
    const [invoices, setInvoices] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get('http://localhost:3009/api/invoices');
                setInvoices(response.data);
            } catch (err) {
                console.log(err);
            }
        })();
    }, []);

    const downloadInvoice = async (chit) => {
        try {
            const response = await axios.get(`http://localhost:3009/api/invoices/${chit.id}`);
            const invoiceData = response.data;

            const MyDocument = (
                <Document>
                    <Page style={styles.page}>
                        <View style={styles.section}>
                            <Text>Customer Name: {invoiceData.customerName}</Text>
                            <Text>Total Amount: {invoiceData.totalAmount}</Text>
                        </View>
                    </Page>
                </Document>
            );

            const blob = await pdf(MyDocument).toBlob();

            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'invoice.pdf';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div>
            <br />
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column'
            }}>
                <h1>Invoices : {invoices.length}</h1>
                {invoices.map(chit => (
                    <div key={chit.id} className="col-md-4 mb-3">
                        <Card.Body>
                            <Card.Title>{chit.customerName}</Card.Title>
                            <Card.Text>{chit.totalAmount}</Card.Text>
                            <Button variant="primary" onClick={() => downloadInvoice(chit)}>
                                Download Invoice
                            </Button>
                        </Card.Body>
                    </div>
                ))}
            </div>
        </div>
    );
}

// Styles for the PDF document
const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        backgroundColor: '#E4E4E4',
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1
    }
});
