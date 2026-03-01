import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { LogIn, Mail, Lock } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const { login, user } = useContext(AuthContext);
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
        try {
            await login(email, password);
        } catch (err) {
            setError('Invalid email or password');
        }
    };

    return (
        <div className="container py-5 mt-lg-5">
            <div className="row justify-content-center">
                <div className="col-md-5">
                    <div className="card border-0 shadow-lg rounded-4 p-4 p-lg-5">
                        <div className="text-center mb-5">
                            <div className="bg-primary bg-opacity-10 d-inline-block p-3 rounded-circle mb-3">
                                <LogIn size={32} className="text-primary" />
                            </div>
                            <h2 className="fw-bold">Welcome Back</h2>
                            <p className="text-muted small">Please enter your details to login</p>
                        </div>

                        {error && <div className="alert alert-danger xsmall rounded-3">{error}</div>}

                        <form onSubmit={submitHandler}>
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
                            <div className="mb-5">
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
                            <button type="submit" className="btn btn-primary btn-lg w-100 rounded-pill shadow-lg mb-4">
                                Login
                            </button>
                        </form>
                        <div className="text-center mt-3">
                            <span className="text-muted small">New to ShopEZ? </span>
                            <Link to={redirect ? `/register?redirect=${redirect}` : '/register'} className="text-primary text-decoration-none small fw-bold">Sign Up Free</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
