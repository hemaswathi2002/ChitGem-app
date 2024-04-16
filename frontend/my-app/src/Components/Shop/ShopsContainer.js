import ShopsTable from './ShopsTable'
import ShopsForm from './ShopsForm'
export default function ChitsContainer(){
    return(
        <div className="row">
        <h2>Shop Conditainer</h2>
        <div className="col-md-8">
            <ShopsTable/>
        </div>
        <div className="col-md-4">
        {/* <ShopsForm/> */}
        </div>
        </div>
    )
}
