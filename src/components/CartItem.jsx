import React from 'react';
import { Plus, Minus, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';

const CartItem = ({ item }) => {
  const { increaseQuantity, decreaseQuantity, removeFromCart } = useCart();

  return (
    <div className="flex items-center py-4 border-b">
      <div className="flex-shrink-0 w-20 h-20 rounded-md overflow-hidden">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="ml-4 flex-grow">
        <h3 className="font-medium">{item.quantity}× {item.name}</h3>
        <p className="text-gray-600 text-sm">{item.ingredients.join(', ')}</p>
      </div>
      
      <div className="flex items-center">
        <span className="font-bold mr-4">{(item.price * item.quantity).toLocaleString()} DZD</span>
        
        <div className="flex items-center space-x-2">
          <button 
            onClick={() => decreaseQuantity(item.id)}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-yellow-400 hover:bg-yellow-500 transition-colors"
          >
            <Minus size={16} />
          </button>
          
          <span className="w-8 text-center font-medium">{item.quantity}</span>
          
          <button 
            onClick={() => increaseQuantity(item.id)}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-yellow-400 hover:bg-yellow-500 transition-colors"
          >
            <Plus size={16} />
          </button>
          
          <button 
            onClick={() => removeFromCart(item.id)}
            className="ml-2 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition-colors"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;