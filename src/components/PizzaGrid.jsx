import React from 'react';
import PizzaCard from './PizzaCard';

const PizzaGrid = ({ pizzas }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
      {pizzas.map(pizza => (
        <div key={pizza.id} className="h-full">
          <PizzaCard pizza={pizza} />
        </div>
      ))}
    </div>
  );
};

export default PizzaGrid;