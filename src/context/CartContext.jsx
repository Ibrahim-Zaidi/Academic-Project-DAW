import React, { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext();

const initialState = {
  cartItems: [],
};

const loadFromStorage = () => {
  try {
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : initialState;
  } catch (error) {
    console.error('Error loading cart from localStorage:', error);
    return initialState;
  }
};

const saveToStorage = (state) => {
  try {
    localStorage.setItem('cart', JSON.stringify(state));
  } catch (error) {
    console.error('Error saving cart to localStorage:', error);
  }
};

const cartReducer = (state, action) => {
  let newState;
  
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingItem = state.cartItems.find(item => item.id === action.payload.id);
      
      if (existingItem) {
        newState = {
          ...state,
          cartItems: state.cartItems.map(item => 
            item.id === action.payload.id 
              ? { ...item, quantity: item.quantity + 1 } 
              : item
          )
        };
      } else {
        newState = {
          ...state,
          cartItems: [...state.cartItems, { ...action.payload, quantity: 1 }]
        };
      }
      break;
      
    case 'INCREASE_QUANTITY':
      newState = {
        ...state,
        cartItems: state.cartItems.map(item => 
          item.id === action.payload 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        )
      };
      break;
      
    case 'DECREASE_QUANTITY':
      newState = {
        ...state,
        cartItems: state.cartItems.map(item => 
          item.id === action.payload && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 } 
            : item
        )
      };
      break;
      
    case 'REMOVE_FROM_CART':
      newState = {
        ...state,
        cartItems: state.cartItems.filter(item => item.id !== action.payload)
      };
      break;
      
    case 'CLEAR_CART':
      newState = {
        ...state,
        cartItems: []
      };
      break;
      
    default:
      return state;
  }
  
  saveToStorage(newState);
  return newState;
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState, loadFromStorage);
  
  const addToCart = (item) => {
    dispatch({ type: 'ADD_TO_CART', payload: item });
  };
  
  const increaseQuantity = (itemId) => {
    dispatch({ type: 'INCREASE_QUANTITY', payload: itemId });
  };
  
  const decreaseQuantity = (itemId) => {
    dispatch({ type: 'DECREASE_QUANTITY', payload: itemId });
  };
  
  const removeFromCart = (itemId) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: itemId });
  };
  
  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };
  
  const getTotalPrice = () => {
    return state.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };
  
  const value = {
    cartItems: state.cartItems,
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
    getTotalPrice
  };
  
  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};