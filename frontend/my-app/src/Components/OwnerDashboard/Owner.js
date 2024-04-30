import { Link } from "react-router-dom"
export default function Owner(){
    return(
        <div>
            <Link to = '/shop'>shop</Link>  |  
            {/* <Link to = '/customers'>customer</Link> */}
            <Link to = '/register'>Register customer</Link>
        </div>
    )
}