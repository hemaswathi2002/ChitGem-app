import { Link } from 'react-router-dom';
import { useAuth } from '../../Context/AuthrorizeContext';

export default function Header() {
    const { user } = useAuth();

    return (
        <nav className="navbar navbar-expand-lg bg-light-pink" style={{ backgroundColor: "#FFB6C1" }}>
            <div className="container-fluid">
                <ul className="navbar-nav d-flex justify-content-between w-30">
                    <li className="nav-item">
                        <Link to="/" className="nav-link active" aria-current="page">Home</Link>
                    </li>  
                    <li className="nav-item">
                        <Link to="/register" className="nav-link active" aria-current="page">Register</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/login" className="nav-link active" aria-current="page">Login</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
