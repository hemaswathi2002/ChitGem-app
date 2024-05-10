import { useAuth } from '../Context/AuthrorizeContext'
import Footer from '../Components/Footer'
import '../index.css'

export default function Account() {
    const { user } = useAuth()

    return (
        <div className="account-details-wrapper" style = {{paddingTop:'80px'}}>
            <div className="account-details-container">
                <h2>Account Info</h2>
                {user && (
                    <div>
                        <p>Username - {user.username}</p>
                        <p>Email - {user.email}</p>
                        <p>Role - {user.role}</p>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    )
}