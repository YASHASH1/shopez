import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ArrowLeft, ShoppingBag, CreditCard } from 'lucide-react';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';

const Cart = () => {
    const { cartItems, removeFromCart, addToCart } = useContext(CartContext);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const totalPrice = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2);

    const checkoutHandler = () => {
        if (!user) {
            navigate('/login?redirect=cart');
        } else {
            // Logic for creating order & mock UPI payment
            alert('Mock UPI Payment: Please scan the code (just a simulation for now)');
            navigate('/profile');
        }
    };

    return (
        <div className="container py-5">
            <h2 className="brand-font display-4 fw-bold mb-5 d-flex align-items-center text-uppercase border-bottom border-dark border-4 pb-3">
                <ShoppingBag size={40} className="me-4 text-dark" strokeWidth={2} /> Your Cart
            </h2>

            {cartItems.length === 0 ? (
                <div className="text-center py-5 bg-light border border-secondary border-opacity-25 p-5">
                    <h4 className="text-secondary mb-4 brand-font text-uppercase tracking-widest">Your cart is empty</h4>
                    <Link to="/shop" className="btn btn-dark px-5 rounded-0 brand-font fs-5 py-3">START SHOPPING</Link>
                </div>
            ) : (
                <div className="row g-5">
                    <div className="col-lg-8">
                        <div className="card border-0 rounded-0 bg-transparent">
                            <div className="list-group list-group-flush">
                                {cartItems.map((item) => (
                                    <div key={item.product} className="list-group-item p-4 border border-secondary border-opacity-25 mb-3 bg-white">
                                        <div className="row align-items-center">
                                            <div className="col-3 col-md-2 bg-light p-2 text-center" style={{ height: '90px' }}>
                                                <img src={item.image} alt={item.name} className="img-fluid h-100 object-fit-contain mix-blend-multiply" />
                                            </div>
                                            <div className="col-6 col-md-5 ps-md-4">
                                                <Link to={`/product/${item.product}`} className="text-decoration-none text-dark brand-font fs-5 fw-bold text-uppercase">{item.name}</Link>
                                                <p className="text-secondary fw-bold mb-0 mt-1">${item.price}</p>
                                            </div>
                                            <div className="col-6 col-md-3 mt-3 mt-md-0">
                                                <select
                                                    className="form-select border-dark rounded-0 fw-bold"
                                                    value={item.qty}
                                                    onChange={(e) => addToCart(item, Number(e.target.value))}
                                                >
                                                    {[...Array(item.stock).keys()].map((x) => (
                                                        <option key={x + 1} value={x + 1}>
                                                            {x + 1}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="col-3 col-md-2 text-end">
                                                <button
                                                    className="btn btn-outline-danger btn-sm rounded-0 p-2 border-0"
                                                    onClick={() => removeFromCart(item.product)}
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <Link to="/shop" className="btn btn-link text-decoration-none text-dark fw-bold mt-4 d-flex align-items-center text-uppercase tracking-widest">
                            <ArrowLeft size={18} className="me-2" /> Continue Shopping
                        </Link>
                    </div>
                    <div className="col-lg-4">
                        <div className="card border-0 bg-light rounded-0 p-4 border-top border-5 border-dark">
                            <h5 className="brand-font fs-3 fw-bold mb-4 text-uppercase">Summary</h5>
                            <div className="d-flex justify-content-between mb-3 border-bottom border-secondary border-opacity-25 pb-3">
                                <span className="text-secondary fw-bold text-uppercase small">Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)} items)</span>
                                <span className="fw-bold fs-5">${totalPrice}</span>
                            </div>
                            <div className="d-flex justify-content-between mb-3 border-bottom border-secondary border-opacity-25 pb-3">
                                <span className="text-secondary fw-bold text-uppercase small">Shipping</span>
                                <span className="text-dark small fw-bold">FREE</span>
                            </div>
                            <div className="d-flex justify-content-between mt-4 mb-5">
                                <span className="brand-font fs-4 fw-bold text-uppercase">Total</span>
                                <span className="brand-font fs-3 fw-bold text-dark">${totalPrice}</span>
                            </div>
                            <button
                                className="btn btn-dark btn-lg w-100 rounded-0 brand-font fs-5 text-uppercase tracking-widest py-3 d-flex align-items-center justify-content-center"
                                onClick={checkoutHandler}
                            >
                                <CreditCard size={24} className="me-3" /> CHECKOUT
                            </button>

                            <div className="mt-4 p-3 border border-dark text-center">
                                <p className="xsmall text-dark mb-0 fw-bold text-uppercase tracking-widest">Mock UPI System Enabled</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
