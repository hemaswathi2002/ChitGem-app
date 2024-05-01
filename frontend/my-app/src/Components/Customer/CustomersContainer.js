import CustomersTable from './CustomersTable'
import CustomersForm from './CustomersForm'
export default function CustomersContainer(props){
    const {users} = props
    return(
        <div className="row">
            <div className="col-md-8">
            <CustomersTable users = {users}/>
            </div>
            <div className="col-md-4">
            <CustomersForm users = {users}/>
            </div>      
        </div>
    )
}