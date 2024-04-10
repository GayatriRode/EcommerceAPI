import React from 'react';
import './style.css';

function Product({ product }) {
  return (
    <div key={product.title} className="product">
      <div className="card">
        <img src={product.image} alt={product.title} />
        <br />
        <h3>{product.title}</h3>
        <p>Price: Rs. {product.price} | {product.compare_at_price}</p>
        <p>Vendor: {product.vendor}</p>
      </div>
    </div>
  );
  
}

export default Product;
