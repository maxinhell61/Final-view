// import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

function Cart() {
  const navigate = useNavigate();
  const { cart, cartTotal, updateQuantity, removeFromCart } = useCart();

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Shopping Cart</h2>
      
      {cart.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600">Your cart is empty</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center space-x-4 py-4 border-b">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="text-gray-600">${item.price.toFixed(2)}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button 
                    className="px-2 py-1 border rounded"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button 
                    className="px-2 py-1 border rounded"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>
                <button 
                  className="text-red-500 hover:text-red-700"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          
          <div className="mt-6 border-t pt-6">
            <div className="flex justify-between text-xl font-semibold">
              <span>Total:</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            <button
              onClick={handleCheckout}
              className="mt-4 w-full bg-primary text-white py-3 rounded-lg hover:bg-primary/90 transition-colors"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;