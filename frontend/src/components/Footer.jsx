import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-dark text-white pt-5 pb-3 mt-auto border-top border-secondary">
            <div className="container">
                <div className="row g-4">
                    <div className="col-lg-4 mb-4 mb-lg-0">
                        <h5 className="brand-font fs-2 fw-bold text-white mb-3 tracking-tight">SHOPEZ</h5>
                        <p className="text-secondary small pe-lg-5">
                            Engineered for speed. Designed for life. The ultimate performance marketplace. Modern, fast, and secure.
                        </p>
                    </div>

                    <div className="col-lg-2 col-md-4 mb-4 mb-md-0">
                        <h6 className="text-uppercase brand-font fs-5 fw-bold mb-3">Shop</h6>
                        <ul className="list-unstyled mb-0 small">
                            <li className="mb-2"><Link to="/shop" className="text-secondary text-decoration-none hover-white">All Products</Link></li>
                            <li className="mb-2"><a href="/#categories" className="text-secondary text-decoration-none hover-white">Categories</a></li>
                        </ul>
                    </div>

                    <div className="col-lg-2 col-md-4 mb-4 mb-md-0">
                        <h6 className="text-uppercase brand-font fs-5 fw-bold mb-3">Account</h6>
                        <ul className="list-unstyled mb-0 small">
                            <li className="mb-2"><Link to="/profile" className="text-secondary text-decoration-none hover-white">My Profile</Link></li>
                            <li className="mb-2"><Link to="/cart" className="text-secondary text-decoration-none hover-white">My Cart</Link></li>
                        </ul>
                    </div>

                    <div className="col-lg-4 col-md-4">
                        <h6 className="text-uppercase brand-font fs-5 fw-bold mb-3">Join The Squad</h6>
                        <p className="text-secondary small mb-3">Sign up for early drops and exclusive sales.</p>
                        <div className="input-group mb-3">
                            <input type="email" className="form-control rounded-0 border-secondary bg-transparent text-white" placeholder="Email address" />
                            <button className="btn btn-light rounded-0 px-4 fw-bold" type="button">SIGN UP</button>
                        </div>
                    </div>
                </div>

                <div className="border-top border-secondary mt-4 pt-4 text-center">
                    <p className="small text-secondary mb-0 brand-font tracking-widest text-uppercase">&copy; {new Date().getFullYear()} ShopEZ. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
