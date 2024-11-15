import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';


function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Handle search logic here, e.g., call an API or filter items
    console.log(`Searching for: ${query}`);
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="text-2xl font-semibold text-blue-500">
            Logo
          </Link>

          {/* Search Bar for Desktop */}
          <form onSubmit={handleSearch} className="hidden md:flex items-center w-1/3 mx-auto">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search..."
                value={query}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
              />
              <button
                type="submit"
                className="absolute left-2 top-2 text-gray-500 hover:text-blue-500 focus:outline-none"
              >
               
              </button>
            </div>
          </form>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            <NavLink
              to="/createcard"
              className="text-gray-800 hover:text-blue-500"
              activeClassName="text-blue-500 font-semibold"
            >
              Airbnb
            </NavLink>
            <NavLink
              to="/login"
              className="text-gray-800 hover:text-blue-500"
              activeClassName="text-blue-500 font-semibold"
            >
              Login
            </NavLink>
        
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-800 hover:text-blue-500 focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          {/* Mobile Search Bar */}
          <form onSubmit={handleSearch} className="flex items-center justify-center p-4">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search..."
                value={query}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
              />
              <button type="submit" className="absolute left-2 top-2 text-gray-500 hover:text-blue-500 focus:outline-none">
                
              </button>
            </div>
          </form>
          <div className="flex flex-col items-center py-4 space-y-4">
            <NavLink
              to="/createcard"
              className="text-gray-800 hover:text-blue-500"
              activeClassName="text-blue-500 font-semibold"
              onClick={toggleMenu}
            >
              Airbnb
            </NavLink>
            <NavLink
              to="/login"
              className="text-gray-800 hover:text-blue-500"
              activeClassName="text-blue-500 font-semibold"
              onClick={toggleMenu}
            >
              Login
            </NavLink>
          
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
