import ChitsTable from'./ChitsTable'
import ChitForm from './ChitsForm'
export default function ChitsContainer(){
    return(
        <div className="row">
        <div className="col-md-8">
        <ChitsTable/>
        </div>
        <div className="col-md-4">
        {/* <ChitForm/> */}
        </div> 
        </div>
    )
}