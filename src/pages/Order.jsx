import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Order = () => {
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const totalPrice = getTotalPrice();
  
  const [customerInfo, setCustomerInfo] = useState({
    firstName: '',
    phoneNumber: '',
    address: '',
    priority: false
  });
  
  const [errors, setErrors] = useState({});
  
  if (cartItems.length === 0) {
    navigate('/');
    return null;
  }
  
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCustomerInfo({
      ...customerInfo,
      [name]: type === 'checkbox' ? checked : value
    });
    
    // Clear error for this field when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!customerInfo.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!customerInfo.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^\d{9,12}$/.test(customerInfo.phoneNumber.replace(/\s/g, ''))) {
      newErrors.phoneNumber = 'Please enter a valid phone number';
    }
    
    if (!customerInfo.address.trim()) {
      newErrors.address = 'Address is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleGetPosition = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser');
      return;
    }
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCustomerInfo({
          ...customerInfo,
          address: `[Location detected: ${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)}]`
        });
      },
      () => {
        alert('Unable to retrieve your location');
      }
    );
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    // In a real app, we would send the order to a server
    // For now, we'll just simulate a successful order
    
    const orderData = {
      items: cartItems,
      customer: customerInfo,
      totalPrice,
      priority: customerInfo.priority,
      date: new Date().toISOString()
    };
    
    // Store order in localStorage for demonstration
    const orders = JSON.parse(localStorage.getItem('pizzaOrders') || '[]');
    orders.push(orderData);
    localStorage.setItem('pizzaOrders', JSON.stringify(orders));
    
    // Clear the cart and navigate to confirmation
    clearCart();
    navigate('/order-confirmation');
  };
  
  const priorityPrice = customerInfo.priority ? Math.round(totalPrice * 0.2) : 0;
  const finalPrice = totalPrice + priorityPrice;
  
  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/cart" className="inline-flex items-center text-blue-500 hover:text-blue-700 mb-6">
        <ArrowLeft size={18} className="mr-1" />
        Back to cart
      </Link>
      
      <h1 className="text-3xl font-bold mb-6">Ready to order? Let's go!</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
            <div className="mb-4">
              <label htmlFor="firstName" className="block text-gray-700 font-medium mb-2">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={customerInfo.firstName}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-yellow-500 focus:border-yellow-500 ${
                  errors.firstName ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
              )}
            </div>
            
            <div className="mb-4">
              <label htmlFor="phoneNumber" className="block text-gray-700 font-medium mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={customerInfo.phoneNumber}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-yellow-500 focus:border-yellow-500 ${
                  errors.phoneNumber ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.phoneNumber && (
                <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>
              )}
            </div>
            
            <div className="mb-4">
              <div className="flex justify-between items-end">
                <label htmlFor="address" className="block text-gray-700 font-medium mb-2">
                  Delivery Address
                </label>
                <button
                  type="button"
                  onClick={handleGetPosition}
                  className="text-sm text-blue-500 flex items-center hover:text-blue-700"
                >
                  <MapPin size={16} className="mr-1" />
                  Get Position
                </button>
              </div>
              <input
                type="text"
                id="address"
                name="address"
                value={customerInfo.address}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-yellow-500 focus:border-yellow-500 ${
                  errors.address ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.address && (
                <p className="text-red-500 text-sm mt-1">{errors.address}</p>
              )}
            </div>
            
            <div className="mb-6">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="priority"
                  name="priority"
                  checked={customerInfo.priority}
                  onChange={handleInputChange}
                  className="h-5 w-5 text-yellow-500 rounded focus:ring-yellow-500"
                />
                <label htmlFor="priority" className="ml-2 text-gray-700">
                  Give your order priority?
                </label>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Prioritized orders are prepared first and delivered faster! 20% extra charge.
              </p>
            </div>
            
            <button
              type="submit"
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium py-3 px-6 rounded-lg transition-colors"
            >
              ORDER NOW FROM {finalPrice.toLocaleString()} DZD
            </button>
          </form>
        </div>
        
        <div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            
            <ul className="divide-y">
              {cartItems.map((item) => (
                <li key={item.id} className="py-3 flex justify-between">
                  <div>
                    <span className="font-medium">{item.quantity}×</span> {item.name}
                  </div>
                  <span className="font-medium">
                    {(item.price * item.quantity).toLocaleString()} DZD
                  </span>
                </li>
              ))}
            </ul>
            
            <div className="border-t border-b py-3 my-4">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>{totalPrice.toLocaleString()} DZD</span>
              </div>
              
              {customerInfo.priority && (
                <div className="flex justify-between text-yellow-700">
                  <span>Priority:</span>
                  <span>+{priorityPrice.toLocaleString()} DZD</span>
                </div>
              )}
            </div>
            
            <div className="flex justify-between font-bold text-lg">
              <span>Total:</span>
              <span>{finalPrice.toLocaleString()} DZD</span>
            </div>
          </div>
          
          <div className="bg-gray-100 rounded-lg p-6 mt-6">
            <h3 className="font-semibold mb-2">Delivery Information</h3>
            <p className="text-sm text-gray-600">
              We aim to deliver your order within 60 minutes. Delivery times may vary based on distance, weather conditions, and order volume.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;