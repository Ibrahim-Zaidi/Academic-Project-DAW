import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Clock } from 'lucide-react';

const OrderConfirmation = () => {
  const [estimatedDelivery, setEstimatedDelivery] = useState('');
  
  useEffect(() => {
    // Get current time and add 45-60 minutes for delivery estimate
    const now = new Date();
    const deliveryTime = new Date(now.getTime() + (Math.floor(Math.random() * 15) + 45) * 60000);
    setEstimatedDelivery(deliveryTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
  }, []);
  
  return (
    <div className="container mx-auto px-4 py-16 max-w-2xl">
      <div className="bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="flex justify-center mb-6">
          <CheckCircle size={80} className="text-green-500" />
        </div>
        
        <h1 className="text-3xl font-bold mb-4">Thank You for Your Order!</h1>
        <p className="text-xl mb-6">Your pizzas are on their way to you.</p>
        
        <div className="bg-gray-100 rounded-lg p-6 mb-6 text-left">
          <h2 className="text-xl font-semibold mb-4">Order Details</h2>
          
          <div className="flex items-start mb-4">
            <Clock size={24} className="mr-3 text-gray-700 mt-1" />
            <div>
              <p className="font-medium">Estimated Delivery Time</p>
              <p className="text-lg">{estimatedDelivery}</p>
            </div>
          </div>
          
          <p className="mt-4 text-sm text-gray-600">
            You can track your order using the phone number you provided during checkout.
          </p>
        </div>
        
        <Link 
          to="/"
          className="inline-block bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium py-3 px-8 rounded-lg transition-colors"
        >
          Return to Menu
        </Link>
      </div>
    </div>
  );
};

export default OrderConfirmation;