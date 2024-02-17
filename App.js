import React, { useState } from 'react';
import './App.css';
import product from '././product.jpg';
import product2 from '././product2.jpg';
import product3 from '././product3.jpg';

const products = [
  { id: 1, name: 'Product 1', category: 'Dress', price: 10, rating: 4, image: product },
  { id: 2, name: 'Product 2', category: 'Shirt', price: 20, rating: 3, image: product2 },
  { id: 3, name: 'Product 3', category: 'Watch', price: 15, rating: 5, image: product3},
];

function App() {
  const [cart, setCart] = useState([]);
  const [quantity, setQuantity] = useState({});

  const handleAddToCart = (product) => {
    setCart([...cart, product]);
    setQuantity({ ...quantity, [product.id]: (quantity[product.id] || 0) + 1 });
  };

  const handleRemoveFromCart = (productId) => {
    const updatedCart = cart.filter(product => product.id !== productId);
    setCart(updatedCart);
    const updatedQuantity = { ...quantity };
    delete updatedQuantity[productId];
    setQuantity(updatedQuantity);
  };

  const handleIncrement = (productId) => {
    setQuantity({ ...quantity, [productId]: quantity[productId] + 1 });
  };

  const handleDecrement = (productId) => {
    if (quantity[productId] > 1) {
      setQuantity({ ...quantity, [productId]: quantity[productId] - 1 });
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <nav>
          <div className="search-bar">
            <input type="text" placeholder="Search..." />
          </div>
          <div className="filter-options">
            {/* Add filter options here */}
          </div>
        </nav>
      </header>
      <main>
        <div className="product-list">
          {products.map(product => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>Category: {product.category}</p>
              <p>Price: ${product.price}</p>
              <p>Rating: {product.rating}</p>
              <div className="quantity-controls">
                <button onClick={() => handleDecrement(product.id)}>-</button>
                <span>{quantity[product.id] || 0}</span>
                <button onClick={() => handleIncrement(product.id)}>+</button>
              </div>
              <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
            </div>
          ))}
        </div>
        <div className="cart">
          <h2>Shopping Cart</h2>
          {cart.map(product => (
            <div key={product.id} className="cart-item">
              <p>{product.name} x {quantity[product.id]}</p>
              <button onClick={() => handleRemoveFromCart(product.id)}>Remove</button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
