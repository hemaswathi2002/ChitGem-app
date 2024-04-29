import ShopsTable from './ShopsTable'
import ShopsForm from './ShopsForm'
export default function ChitsContainer(){
    return(
        <div className="row">
        <h2>Shop Conditainer</h2>
        <div>
        <ShopsTable/>
        </div>
        <div>
        <ShopsForm/>
        </div>
        </div>
    )
}
