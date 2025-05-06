import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

const PizzaCard = ({ pizza }) => {
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(pizza);
    showToast(`${pizza.name} added to cart!`);
  };

  return (
    <Link 
      to={`/pizza/${pizza.id}`} 
      className="group block rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow h-full"
    >
      <div className="relative aspect-square w-full h-64">
        <img 
          src={pizza.image} 
          alt={pizza.name} 
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-4 bg-white">
        <h3 className="text-lg font-semibold mb-1">{pizza.name}</h3>
        <p className="text-gray-600 text-sm mb-2 line-clamp-2">
          {pizza.ingredients.join(', ')}
        </p>
        <div className="flex justify-between items-center mt-2">
          <span className="text-sm font-bold">{pizza.price.toLocaleString()} DZD</span>
          <button
            onClick={handleAddToCart}
            className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 text-sm font-medium py-1 px-2 rounded-lg transition-colors duration-300"
          >
            ADD TO CART
          </button>
        </div>
      </div>
    </Link>
  );
};

export default PizzaCard;