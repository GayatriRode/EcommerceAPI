import React, { useState, useEffect } from 'react';
import './style.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json');
        const data = await response.json();
        setProducts(data.categories);
        setFilteredProducts(data.categories);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const filterProducts = () => {
      if (selectedCategory === 'All') {
        setFilteredProducts(products);
      } else {
        const filtered = products.filter(cat => cat.category_name === selectedCategory);
        setFilteredProducts(filtered);
      }
    };
    filterProducts();
  }, [selectedCategory, products]);

  useEffect(() => {
    const searchProducts = () => {
      const filtered = products.map(cat => ({
        ...cat,
        category_products: cat.category_products.filter(product =>
          product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.vendor.toLowerCase().includes(searchQuery.toLowerCase())
        )
      }));
      setFilteredProducts(filtered);
    };
    searchProducts();
  }, [searchQuery, products]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleSearchInput = (event) => {
    setSearchQuery(event.target.value.trim());
  };

  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
  };

  const calculateTotalAmount = () => {
    return cartItems.reduce((total, item) => total + parseFloat(item.price), 0).toFixed(2);
  };

  return (
    <div>
      <div>
        {products.map(category => (
          <button key={category.category_name} className="category-button" onClick={() => handleCategoryClick(category.category_name)}>
            {category.category_name}
          </button>
        ))}
      </div>
      <input id="search-input" type="text" placeholder="Search products" value={searchQuery} onChange={handleSearchInput}/>
      <div id="products">
        {filteredProducts.map(category => (
          category.category_products.map(product => (
            <div className='product'>
            <div key={product.title} className="product">
              <div className="product-items">
                <img src={product.image} alt={product.title} /><br />
                <h3>{product.title}</h3>
                <p className="p1">Price: {product.price} Rs. <del>{product.compare_at_price} Rs. </del></p>
                <p>Vendor: {product.vendor}</p>
                <button className='add-to-cart' onClick={() => addToCart(product)}>Add to Cart</button>
              </div>
            </div>
          </div>
          ))
        ))}
      </div>
        <h2 className='text1'>Cart</h2>
        <div className='cart'>
          {cartItems.map(item => (
            <div key={item.title}>
                <img src={item.image} alt={item.title} className='cartimg'/><br></br>
                <span>{item.title} - {item.price} Rs.</span>
              </div>
          ))}
      </div>
      <p className='amount'><b>Total amount:</b> {calculateTotalAmount()} Rs.</p>
    </div>
  );
};

export default ProductList;
