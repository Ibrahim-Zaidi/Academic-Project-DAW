import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PizzaGrid from '../components/PizzaGrid';
import { pizzaData } from '../data/pizzaData';

const Home = () => {
  const [filteredPizzas, setFilteredPizzas] = useState(pizzaData);
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const searchQuery = searchParams.get('search');
    
    if (searchQuery) {
      const filtered = pizzaData.filter(pizza => {
        const searchLower = searchQuery.toLowerCase();
        return (
          pizza.name.toLowerCase().includes(searchLower) ||
          pizza.ingredients.some(ingredient => 
            ingredient.toLowerCase().includes(searchLower)
          )
        );
      });
      setFilteredPizzas(filtered);
    } else {
      setFilteredPizzas(pizzaData);
    }
  }, [location.search]);

  return (
    <div className="container mx-auto px-4 py-12">
      {location.search ? (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2">Search Results</h2>
          <p className="text-gray-600">
            {filteredPizzas.length} {filteredPizzas.length === 1 ? 'pizza' : 'pizzas'} found
          </p>
        </div>
      ) : (
        <h2 className="text-3xl font-bold mb-12 text-center">Our Pizza Menu</h2>
      )}

      {filteredPizzas.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600">No pizzas found matching your search criteria.</p>
          <p className="mt-4">Try a different search term or browse our menu.</p>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto">
          <PizzaGrid pizzas={filteredPizzas} />
        </div>
      )}
    </div>
  );
};

export default Home;