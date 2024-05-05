// import { Link ,useNavigate} from 'react-router-dom';
// import { useAuth } from '../../Context/AuthrorizeContext';
// import { Navbar, Nav } from 'react-bootstrap';
// import { isEmpty } from 'lodash'
// import './style.css'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faHomeUser, faUserPlus } from '@fortawesome/free-solid-svg-icons'

// export default function Header() {
//     const { user, handleLogout } = useAuth();

//     const navigate = useNavigate()

//     const handleChangeLogout = () => {
//         localStorage.removeItem('token');
//         handleLogout();
//         navigate('/');

//     }

//     return (
//         <nav className="navbar navbar-expand-lg navbar-dark navbar-custom flex-wrap fixed-top">
//             <div className="container">
//                 <a className="navbar-brand" href="#">
//                 {/* <img src={logo} alt="Logo" className="logo" /> */}
//                     ChitGem</a>
//                 <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
//                     <span className="navbar-toggler-icon"></span>
//                 </button>
//                 <div className="collapse navbar-collapse" id="navbarNav">
//                     <ul className="navbar-nav ml-auto">

//                         <li className="nav-item">
//                             {isEmpty(localStorage.getItem('token')) && <Link to="/register" className="nav-link">
//                             <FontAwesomeIcon icon={faUserPlus} />Register</Link>}
//                         </li>
//                         <li className="nav-item">
//                             {isEmpty(localStorage.getItem('token')) ? (
//                                 <Link className="nav-link" to="/login">
//                                      <FontAwesomeIcon icon={faHomeUser} />Login</Link>
//                             ) : (
//                                 <>
//                                     {user?.role === 'owner' ? (
//                                         <li className="nav-item dropdown">
//                                             <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
//                                                 data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
//                                                 My Account
//                                             </a>
//                                             <div className="dropdown-menu" aria-labelledby="navbarDropdown">
//                                                 <Link to="/account" className="dropdown-item">My Account</Link>
//                                                 <Link to="/parkingSpaceBooking" className="dropdown-item">Booking</Link>
//                                                 <Link to="/addparking" className="dropdown-item">Add Space</Link>
//                                                 <Link to="/myspace" className="dropdown-item">My Space</Link>
//                                                 <Link to='/' className="dropdown-item" onClick={handleChangeLogout}>Logout</Link>
//                                             </div>
//                                         </li>
//                                     ) : user?.role === 'admin' ? (
//                                         <li className="nav-item dropdown">
//                                             <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
//                                                 data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
//                                                 My Account
//                                             </a>
//                                             <div className="dropdown-menu" aria-labelledby="navbarDropdown">
//                                                 <Link to="/admin" className="dropdown-item" >My Detail</Link>
//                                                 <a className="dropdown-item" href="#">Customer</a>
//                                                 <Link to="/bookings" className="dropdown-item">Bookings</Link>
//                                                 <Link to="/ownerDetails" className="dropdown-item" href="#">owners</Link>
                                              
//                                                 <Link className="dropdown-item" to='/' onClick={handleLogout}>Logout</Link>
//                                             </div>
//                                         </li>
//                                     ) : user?.role === 'customer' ? (
//                                         <li className="nav-item dropdown">
//                                             <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
//                                                 data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
//                                                 My Account
//                                             </a>
//                                             <div className="dropdown-menu" aria-labelledby="navbarDropdown">
//                                             <Link to="/" className="dropdown-item">Home</Link> {/* New Home Link */}
//                                                 <Link to="/account" className="dropdown-item" href="#"> Account</Link>
//                                                 <Link to="/bookings" className="dropdown-item" href="#">My bookings</Link>
//                                                 <Link to="/vehicles" className="dropdown-item" href="#">my vehicles</Link>
//                                                 <Link to="/spaceCart" className="dropdown-item" href="#">my spaceCart</Link>
//                                                 <Link className="dropdown-item" to='/' onClick={handleChangeLogout}>Logout</Link>
//                                             </div>
//                                         </li>
//                                     ) : null}
//                                 </>
//                             )}
//                         </li>
//                     </ul>

//                 </div>
//             </div>
//         </nav>
//     );
// }

import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/AuthrorizeContext';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'; // Import NavDropdown for dropdown menu
import { isEmpty } from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHomeUser, faUserPlus } from '@fortawesome/free-solid-svg-icons';

export default function Header() {
    const { user, handleLogout } = useAuth();
    const navigate = useNavigate();

    const handleChangeLogout = () => {
        localStorage.removeItem('token');
        handleLogout();
        navigate('/');
    };

    return (
        <Navbar style={{ backgroundColor: 'rgb(94, 9, 9)' }} variant="dark" expand="lg" fixed="top">
            <Navbar.Brand href="#" style={{ color: '#fff' }}>
                {/* <img src={logo} alt="Logo" className="logo" /> */}
                ChitGem
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarNav" />
            <Navbar.Collapse id="navbarNav">
                <Nav className="ml-auto">
                    <Nav.Item>
                        {isEmpty(localStorage.getItem('token')) && <Link to="/register" className="nav-link" style={{ color: '#fff' }}>
                            <FontAwesomeIcon icon={faUserPlus} /> Register
                        </Link>}
                    </Nav.Item>
                    <Nav.Item>
                        {isEmpty(localStorage.getItem('token')) ? (
                            <Link className="nav-link" style={{ color: '#fff' }} to="/login">
                                <FontAwesomeIcon icon={faHomeUser} /> Login
                            </Link>
                        ) : (
                            <>
                                <Nav.Item>
                                {user?.role === 'owner' && (
                                    <div style={{ display: 'flex', alignItems: 'center' }}> 
                                    <Link to="/register" className="nav-link" style={{ color: '#fff', marginLeft : '10px' }}>
                                    <FontAwesomeIcon icon={faUserPlus} /> Register Customer
                                    </Link>       
                                    <Link to="/customers" className="nav-link " style={{ color: '#fff' , marginLeft: '10px' }}>Customers</Link>
                                    <Link to="/chit" className="nav-link " style={{ color: '#fff', marginLeft: '10px' }}>chits</Link>
                                    <Link to="/invoice" className="nav-link " style={{ color: '#fff' , marginLeft: '10px' }}>invoice</Link>
                                    <Link to="/jewels" className="nav-link " style={{ color: '#fff' , marginLeft: '10px' }}>jewels</Link>
                                    </div>
                                )}
                                {user?.role == 'customer' && (
                                    <Link to = '/customers-user' className="nav-link" style={{ color: '#fff', marginLeft : '10px' }}>Customer Details</Link>
                                )}
                                </Nav.Item>
                                <NavDropdown title={<span style={{ color: '#fff'}}>My Account</span>} id="basic-nav-dropdown"  >
                                    {user?.role === 'owner' && (
                                        <>
                                            <NavDropdown.Item as={Link} to="/account" >My Account</NavDropdown.Item>
                                            <NavDropdown.Item as={Link} to="/shop">shop Details</NavDropdown.Item>
                                            <NavDropdown.Item as={Link} to="/addparking">Add Space</NavDropdown.Item>
                                            <NavDropdown.Item as={Link} to="/myspace">My Space</NavDropdown.Item>
                                        </>
                                    )}
                                    {user?.role === 'admin' && (
                                        <>
                                            <NavDropdown.Item as={Link} to="/account">My Detail</NavDropdown.Item>
                                            <NavDropdown.Item href="#">Customer</NavDropdown.Item>
                                            <NavDropdown.Item as={Link} to="/bookings">Bookings</NavDropdown.Item>
                                            <NavDropdown.Item as={Link} to="/ownerDetails">Owners</NavDropdown.Item>
                                        </>
                                    )}
                                    {user?.role === 'customer' && (
                                        <>
                                            <NavDropdown.Item as={Link} to="/">Home</NavDropdown.Item>
                                            <NavDropdown.Item as={Link} to="/account">Account</NavDropdown.Item>
                                            <NavDropdown.Item as={Link} to="/bookings">My bookings</NavDropdown.Item>
                                            <NavDropdown.Item as={Link} to="/vehicles">My vehicles</NavDropdown.Item>
                                            <NavDropdown.Item as={Link} to="/spaceCart">My spaceCart</NavDropdown.Item>
                                        </>
                                    )}
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item onClick={handleChangeLogout}>Logout</NavDropdown.Item>
                                </NavDropdown>
                            </>
                        )}
                    </Nav.Item>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}
