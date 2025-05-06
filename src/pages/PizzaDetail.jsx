import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ShoppingCart } from 'lucide-react';
import { pizzaData } from '../data/pizzaData';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import Comments from '../components/Comments';

// Initial comments for demonstration
const initialCommentsData = {
  1: [
    {
      id: '1',
      name: 'Ahmed',
      rating: 5,
      comment: 'Best Margherita in town! Simple but delicious.',
      date: '2023-10-15T14:48:00.000Z',
    },
    {
      id: '2',
      name: 'Fatima',
      rating: 4,
      comment: 'Really good, but I wish the crust was a bit crispier.',
      date: '2023-11-05T09:23:00.000Z',
    },
  ],
  3: [
    {
      id: '1',
      name: 'Karim',
      rating: 5,
      comment: 'The prosciutto is perfect with the arugula. Amazing combination!',
      date: '2023-09-28T18:12:00.000Z',
    },
  ],
};

const PizzaDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const [pizza, setPizza] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [quantity, setQuantity] = useState(1);
  
  // Load comments from localStorage or use initial data
  useEffect(() => {
    const loadComments = () => {
      try {
        const storedComments = localStorage.getItem('pizzaComments');
        if (storedComments) {
          return JSON.parse(storedComments);
        }
        // If no stored comments, use initial data and save it
        localStorage.setItem('pizzaComments', JSON.stringify(initialCommentsData));
        return initialCommentsData;
      } catch (error) {
        console.error('Error loading comments:', error);
        return initialCommentsData;
      }
    };
    
    const commentsData = loadComments();
    setComments(commentsData[id] || []);
    
    // Find the pizza by ID
    const foundPizza = pizzaData.find(p => p.id.toString() === id);
    setPizza(foundPizza);
    setLoading(false);
  }, [id]);
  
  const addComment = (pizzaId, newComment) => {
    try {
      // Get existing comments from localStorage
      const storedComments = localStorage.getItem('pizzaComments');
      const commentsData = storedComments ? JSON.parse(storedComments) : {};
      
      // Update comments for this pizza
      const updatedPizzaComments = [...(commentsData[pizzaId] || []), newComment];
      const updatedComments = {
        ...commentsData,
        [pizzaId]: updatedPizzaComments
      };
      
      // Save back to localStorage
      localStorage.setItem('pizzaComments', JSON.stringify(updatedComments));
      
      // Update state
      setComments(updatedPizzaComments);
    } catch (error) {
      console.error('Error saving comment:', error);
    }
  };
  
  const handleAddToCart = () => {
    if (pizza) {
      for (let i = 0; i < quantity; i++) {
        addToCart(pizza);
      }
      showToast(`${quantity} ${pizza.name} added to cart!`);
    }
  };
  
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  
  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p className="text-xl">Loading pizza details...</p>
      </div>
    );
  }
  
  if (!pizza) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p className="text-xl text-red-500">Pizza not found!</p>
        <Link to="/" className="mt-4 inline-block text-blue-500 hover:underline">
          Back to menu
        </Link>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/" className="inline-flex items-center text-blue-500 hover:text-blue-700 mb-6">
        <ArrowLeft size={18} className="mr-1" />
        Back to menu
      </Link>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="rounded-lg overflow-hidden shadow-lg">
          <img 
            src={pizza.image} 
            alt={pizza.name} 
            className="w-full h-auto"
          />
        </div>
        
        <div>
          <h1 className="text-3xl font-bold mb-2">{pizza.name}</h1>
          <p className="text-gray-600 mb-4">{pizza.ingredients.join(', ')}</p>
          
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-yellow-600 mb-2">{pizza.price.toLocaleString()} DZD</h2>
            <p className="text-gray-700">{pizza.description || 'Our classic handmade pizza with premium ingredients, baked to perfection in a traditional stone oven.'}</p>
          </div>
          
          <div className="flex items-center mb-6">
            <button 
              onClick={decreaseQuantity}
              className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors"
            >
              -
            </button>
            <span className="mx-4 font-medium text-xl w-6 text-center">{quantity}</span>
            <button 
              onClick={increaseQuantity}
              className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors"
            >
              +
            </button>
          </div>
          
          <button
            onClick={handleAddToCart}
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
          >
            <ShoppingCart size={20} className="mr-2" />
            Add to Cart - {(pizza.price * quantity).toLocaleString()} DZD
          </button>
          
          <div className="mt-8 bg-gray-100 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Special Instructions</h3>
            <p className="text-sm text-gray-600">
              Our pizzas are made fresh to order. Please note that all pizzas are prepared in the same kitchen, so there may be traces of ingredients such as gluten, dairy, nuts, and others.
            </p>
          </div>
        </div>
      </div>
      
      <Comments 
        pizzaId={id} 
        comments={comments} 
        addComment={addComment} 
      />
    </div>
  );
};

export default PizzaDetail;