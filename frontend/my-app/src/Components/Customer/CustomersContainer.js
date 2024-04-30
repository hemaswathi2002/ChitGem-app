import CustomersTable from './CustomersTable'
import CustomersForm from './CustomersForm'
export default function CustomersContainer(){
    return(
        <div className="row">
            <div className="col-md-8">
            <h2>Customer Container</h2>
            <CustomersTable/>
            </div>
            <div className="col-md-4">
            <CustomersForm/>
            </div>      
        </div>
    )
}