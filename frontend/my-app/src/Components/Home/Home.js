import { Link } from "react-router-dom"
export default function Home(){
    return (
        <div>
            <h1>Home Component</h1>
            <p>Please register, if registered please login</p>
            <Link to = '/login'>Login</Link>
        </div>
    )
}