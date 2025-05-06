import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import CartItem from '../components/CartItem';

const Cart = () => {
  const { cartItems, clearCart, getTotalPrice } = useCart();
  const navigate = useNavigate();
  const totalPrice = getTotalPrice();
  
  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
          <p className="text-xl mb-6">Your cart is empty</p>
          <Link 
            to="/"
            className="inline-block bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium py-3 px-6 rounded-lg transition-colors"
          >
            Return to Menu
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/" className="inline-flex items-center text-blue-500 hover:text-blue-700 mb-6">
        <ArrowLeft size={18} className="mr-1" />
        Back to menu
      </Link>
      
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="space-y-1">
          {cartItems.map(item => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>
        
        <div className="mt-8 pt-4 border-t">
          <div className="flex justify-between text-xl font-bold">
            <span>Total:</span>
            <span>{totalPrice.toLocaleString()} DZD</span>
          </div>
        </div>
        
        <div className="mt-8 flex flex-col sm:flex-row justify-between gap-4">
          <button
            onClick={clearCart}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-3 px-6 rounded-lg transition-colors"
          >
            Clear Cart
          </button>
          
          <button
            onClick={() => navigate('/order')}
            className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
          >
            <ShoppingBag size={20} className="mr-2" />
            Proceed to Checkout
          </button>
        </div>
      </div>
      
      <div className="bg-gray-100 rounded-lg p-6">
        <h2 className="font-semibold mb-2">Order Information</h2>
        <p className="text-sm text-gray-600">
          Orders are typically ready for pickup in 30-45 minutes. We offer delivery within a 5km radius of our restaurant.
        </p>
      </div>
    </div>
  );
};

export default Cart;