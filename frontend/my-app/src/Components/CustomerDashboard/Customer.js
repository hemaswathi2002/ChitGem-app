import {Link} from 'react-router-dom'
export default function Customer(){
    return (
        <div>
            <h2>Welcome to Customer Dashboard</h2>
            <Link to = '/customers-user'>customer Details</Link>
        </div>
    )
}