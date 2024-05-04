import { useDispatch } from "react-redux";
import { startGenerateInvoice } from "../../Actions/Invoice";
import { Button } from "react-bootstrap";
export default function InvoiceForm(){
    const dispatch = useDispatch()
        const handleGenerateInvoice = async () => {
            try {
                dispatch(startGenerateInvoice())
            } catch (error) {
                console.error('Error generating invoice:', error);
            }
        };
    return (
        // <button onClick={handleGenerateInvoice}>Generate Invoice</button>
        <Button onClick={handleGenerateInvoice}style={{ backgroundColor: 'maroon' }}>Generate Invoice</Button>

    )
}