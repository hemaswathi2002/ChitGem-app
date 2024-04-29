import { useAuth } from "../../Context/AuthrorizeContext"
export default function Home() {
    const { user } = useAuth() 
    return (
        <div>
            <h2>Home Component</h2>
            { !user ? <p>user not logged in </p> : <p> Welcome { user.username }</p>}
        </div>
    )
}