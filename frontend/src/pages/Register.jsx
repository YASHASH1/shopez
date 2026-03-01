import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { UserPlus, Mail, Lock, User as UserIcon } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState(null);

    const { register, user } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const redirect = location.search ? location.search.split('=')[1] : '/';

    useEffect(() => {
        if (user) {
            navigate(redirect);
        }
    }, [user, navigate, redirect]);

    const submitHandler = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage('Passwords do not match');
        } else {
            try {
                await register(name, email, password);
            } catch (err) {
                setMessage('Registration failed. Please try again.');
            }
        }
    };

    return (
        <div className="container py-5 mt-lg-5">
            <div className="row justify-content-center">
                <div className="col-md-5">
                    <div className="card border-0 shadow-lg rounded-4 p-4 p-lg-5">
                        <div className="text-center mb-5">
                            <div className="bg-primary bg-opacity-10 d-inline-block p-3 rounded-circle mb-3">
                                <UserPlus size={32} className="text-primary" />
                            </div>
                            <h2 className="fw-bold">Join ShopEZ</h2>
                            <p className="text-muted small">Start your shopping journey today</p>
                        </div>

                        {message && <div className="alert alert-danger xsmall rounded-3">{message}</div>}

                        <form onSubmit={submitHandler}>
                            <div className="mb-4">
                                <div className="input-group bg-light rounded-pill px-3 py-1">
                                    <span className="input-group-text border-0 bg-transparent text-muted"><UserIcon size={18} /></span>
                                    <input
                                        type="text"
                                        className="form-control border-0 bg-transparent shadow-none"
                                        placeholder="Full Name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="mb-4">
                                <div className="input-group bg-light rounded-pill px-3 py-1">
                                    <span className="input-group-text border-0 bg-transparent text-muted"><Mail size={18} /></span>
                                    <input
                                        type="email"
                                        className="form-control border-0 bg-transparent shadow-none"
                                        placeholder="Email Address"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="mb-4">
                                <div className="input-group bg-light rounded-pill px-3 py-1">
                                    <span className="input-group-text border-0 bg-transparent text-muted"><Lock size={18} /></span>
                                    <input
                                        type="password"
                                        className="form-control border-0 bg-transparent shadow-none"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="mb-5">
                                <div className="input-group bg-light rounded-pill px-3 py-1">
                                    <span className="input-group-text border-0 bg-transparent text-muted"><Lock size={18} /></span>
                                    <input
                                        type="password"
                                        className="form-control border-0 bg-transparent shadow-none"
                                        placeholder="Confirm Password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary btn-lg w-100 rounded-pill shadow-lg mb-4">
                                Create Account
                            </button>
                        </form>
                        <div className="text-center mt-3">
                            <span className="text-muted small">Already have an account? </span>
                            <Link to={redirect ? `/login?redirect=${redirect}` : '/login'} className="text-primary text-decoration-none small fw-bold">Login</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
