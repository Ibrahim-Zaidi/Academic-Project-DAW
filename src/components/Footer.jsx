import React from 'react';
import { Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center space-y-6">
          <div className="text-center">
            <h3 className="text-xl font-bold mb-2">Fast Pizza Co.</h3>
            <p className="text-gray-300">Quality ingredients, authentic recipes</p>
          </div>
          
          <div className="flex space-x-6">
            <a href="#" className="hover:text-yellow-400 transition-colors">
              <Facebook size={24} />
            </a>
            <a href="#" className="hover:text-yellow-400 transition-colors">
              <Instagram size={24} />
            </a>
            <a href="#" className="hover:text-yellow-400 transition-colors">
              <Twitter size={24} />
            </a>
          </div>
          
          <div className="text-sm text-gray-400">
            © {new Date().getFullYear()} Fast Pizza Co. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;