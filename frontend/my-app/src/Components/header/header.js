import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/AuthrorizeContext';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { isEmpty } from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHomeUser, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import '../../index.css'

export default function Header() {
    const { user, handleLogout } = useAuth();
    const navigate = useNavigate();

    const handleChangeLogout = () => {
        localStorage.removeItem('token')
        handleLogout()
        navigate('/')
    }

    return (
        <Navbar style={{ backgroundColor: 'rgb(94, 9, 9)' }} variant="dark" expand="lg" fixed="top">
            <Navbar.Brand href="#" style={{ color: '#fff' }}>
                ChitGem
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarNav" />
            <Navbar.Collapse id="navbarNav">
                <Nav className="ml-auto">
                    {isEmpty(localStorage.getItem('token')) && (
                        <>
                        <Link to="/register" className="nav-link" style={{ color: '#fff' }}>
                            <FontAwesomeIcon icon={faUserPlus} /> Register
                        </Link>
                       </>
                    )}
                    {isEmpty(localStorage.getItem('token')) ? (
                        <>
                        <Link className="nav-link" style={{ color: '#fff' }} to="/login">
                            <FontAwesomeIcon icon={faHomeUser} /> Login
                        </Link>
                       </>
                    ) : (
                        <>
                            {user?.role === 'owner' && (
                                <>
                                    <Link to="/customers" className="nav-link" style={{ color: '#fff', marginLeft: '10px' }}>Customers</Link>
                                    <Link to="/chit" className="nav-link" style={{ color: '#fff', marginLeft: '10px' }}>Chits</Link>
                                    <Link to="/all-invoice" className="nav-link" style={{ color: '#fff', marginLeft: '10px' }}>Invoice</Link>
                                    <Link to="/jewels" className="nav-link" style={{ color: '#fff', marginLeft: '10px' }}>Jewels</Link>
                                    <Link to='/live-price' className="nav-link" style={{ color: '#fff', marginLeft: '10px' }}>Live GoldPrice</Link>
                                </>
                            )} 
                                <>
                                {user?.role == 'customer' && (
                                    <>
                                    <Link to="/chit-users" className="nav-link" style={{ color: '#fff', marginLeft: '10px' }}>Chit</Link>
                                    <Link to="/jewels-user" className="nav-link" style={{ color: '#fff', marginLeft: '10px' }}>jewels</Link> 
                                    <Link to="/wishlist" className="nav-link" style={{ color: '#fff', marginLeft: '10px' }}>wishlist</Link> 
                                    <Link to="/invoice" className="nav-link" style={{ color: '#fff', marginLeft: '10px' }}>Savings</Link> 
                                    <Link to='/live-price' className="nav-link" style={{ color: '#fff', marginLeft: '10px' }}>Live GoldPrice</Link>
                                    {/* <Link to="/payment-history" className="nav-link" style={{ color: '#fff', marginLeft: '10px' }}>payment history</Link>  */}
                                    </>
                                )}

                               {user?.role == 'admin' && (
                                    <>
                                    <Link to="/admin" className="nav-link" style={{ color: '#fff', marginLeft: '10px' }}>shops</Link>
                                    </>
                                )}
                                </>
                            <NavDropdown alignRight title={<span style={{ background:'marron', color: '#fff' }}>My Account</span>} id="basic-nav-dropdown" className="custom-dropdown">
                                {user?.role === 'owner' && (
                                    <>
                                        <NavDropdown.Item as={Link} to="/account">My Account</NavDropdown.Item>
                                        <NavDropdown.Item as={Link} to="/shop">Shop Details</NavDropdown.Item>
                                        <NavDropdown.Item as={Link} to="/register">Add Customer <FontAwesomeIcon icon={faUserPlus} /></NavDropdown.Item>
                                        <NavDropdown.Item as={Link} to="/transaction-history">Transactions</NavDropdown.Item>

                                    </>
                                )}
                                {user?.role === 'admin' && (
                                    <>
                                        <NavDropdown.Item as={Link} to="/account">My Detail</NavDropdown.Item>
                                        <NavDropdown.Item as={Link} to="/approved-status">Approved shops</NavDropdown.Item>
                                        <NavDropdown.Item as={Link} to="/ownerDetails">Owners</NavDropdown.Item>
                                    </>
                                )}
                                {user?.role === 'customer' && (
                                    <>
                                        <NavDropdown.Item as={Link} to="/">Home</NavDropdown.Item>
                                        <NavDropdown.Item as={Link} to="/account">Account</NavDropdown.Item>
                                        <NavDropdown.Item as={Link} to="/customers-user">My Details</NavDropdown.Item>
                                        <NavDropdown.Item as={Link} to="/payment-history">Transactions</NavDropdown.Item>

                                    </>
                                )}
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={handleChangeLogout}>Logout</NavDropdown.Item>
                            </NavDropdown>
                        </>
                    )}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
        

    );
}
