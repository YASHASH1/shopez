import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, User, LogOut, LayoutDashboard } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const { cartItems } = useContext(CartContext);

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark py-3 border-bottom border-secondary">
            <div className="container">
                <Link className="navbar-brand brand-font fs-2 text-white fw-bold tracking-tight" to="/">
                    SHOPEZ
                </Link>
                <button className="navbar-toggler rounded-0 border-white" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto align-items-center brand-font fs-5 gap-3">
                        <li className="nav-item">
                            <Link className="nav-link text-white text-uppercase" to="/shop">Shop</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link position-relative text-white" to="/cart">
                                <ShoppingCart size={24} />
                                {cartItems.length > 0 && (
                                    <span style={{ fontSize: '0.65rem' }} className="position-absolute top-0 start-100 translate-middle badge bg-danger text-white rounded-circle p-1">
                                        {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                                    </span>
                                )}
                            </Link>
                        </li>
                        {user ? (
                            <>
                                {user.role === 'admin' && (
                                    <li className="nav-item">
                                        <Link className="btn btn-outline-light btn-sm rounded-0" to="/admin">
                                            DASHBOARD
                                        </Link>
                                    </li>
                                )}
                                <li className="nav-item dropdown">
                                    <button className="nav-link dropdown-toggle btn btn-link text-white" id="userDropdown" data-bs-toggle="dropdown">
                                        <User size={24} />
                                    </button>
                                    <ul className="dropdown-menu dropdown-menu-end shadow-sm rounded-0 border-dark">
                                        <li><Link className="dropdown-item brand-font text-uppercase" to="/profile">Profile</Link></li>
                                        <li><hr className="dropdown-divider" /></li>
                                        <li>
                                            <button className="dropdown-item brand-font text-uppercase text-danger d-flex align-items-center" onClick={logout}>
                                                <LogOut size={16} className="me-2" /> Logout
                                            </button>
                                        </li>
                                    </ul>
                                </li>
                            </>
                        ) : (
                            <li className="nav-item ms-2">
                                <Link className="btn btn-light text-dark rounded-0 px-4" to="/login">LOGIN</Link>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
