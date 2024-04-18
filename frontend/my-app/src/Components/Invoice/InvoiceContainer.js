import InvoiceForm from './InvoiceForm'
import { useDispatch, useSelector } from 'react-redux'
import { setServerErrors } from "../Actions/Invoice"
import { useEffect } from 'react' 
import InvoiceTable from "./InvoiceTable"

export default function InvoiceContainer() {
    const dispatch = useDispatch()
    const invoices = useSelector((state) => {
        return state.invoices
    })

    useEffect(() => {
        return () => {
            dispatch(setServerErrors([]))
        }
    }, [dispatch])

    return (
        <div className="row">
            <div className="col-md-8">
                <InvoiceTable invoices={invoices} />
            </div>
            <div className="col-md-4">
                <h2>Add Review</h2>
                <InvoiceForm />
            </div>
        </div>
    )
}