import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Star } from 'lucide-react';
import { CartContext } from '../context/CartContext';

const ProductCard = ({ product }) => {
    const { addToCart } = useContext(CartContext);

    return (
        <div className="card h-100 border-0 rounded-0 bg-transparent group position-relative">
            <Link to={`/product/${product._id}`} className="d-block bg-light position-relative overflow-hidden mb-3 p-3">
                <img
                    src={product.image}
                    className="card-img-top object-fit-contain mix-blend-multiply transition-scale"
                    alt={product.name}
                    style={{ height: '240px', backgroundColor: 'transparent' }}
                />
            </Link>
            <div className="card-body d-flex flex-column p-0">
                <p className="text-secondary small mb-1 tracking-widest text-uppercase fw-semibold">{product.category}</p>
                <Link to={`/product/${product._id}`} className="text-decoration-none text-dark">
                    <h6 className="card-title brand-font fs-6 fw-bold mb-2 text-truncate text-uppercase">{product.name}</h6>
                </Link>
                <div className="mt-auto d-flex justify-content-between align-items-center mb-3">
                    <span className="fs-5 fw-bold text-dark">${product.price}</span>
                    <div className="d-flex align-items-center">
                        <div className="text-dark xsmall me-1 d-flex">
                            <Star size={14} fill="currentColor" />
                        </div>
                        <span className="text-secondary small fw-bold">{product.rating || '4.5'}</span>
                    </div>
                </div>
                <button
                    className="btn btn-dark w-100 rounded-0 py-2 brand-font fw-bold d-flex justify-content-center align-items-center gap-2"
                    onClick={() => addToCart(product, 1)}
                >
                    <ShoppingCart size={18} /> ADD TO CART
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
