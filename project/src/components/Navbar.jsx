import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaUser } from 'react-icons/fa';

function Navbar() {
  const navigate = useNavigate();

  // Logout function
  const handleLogout = () => {
    sessionStorage.clear(); // Clear session storage
    navigate('/login');     // Redirect to login page
  };

  // Dropdown state and ref
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Toggle dropdown open state
  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  // Close dropdown when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Logout with confirmation prompt
  const confirmLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      handleLogout();
    }
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/home" className="text-2xl font-bold text-primary">
            Clarion
          </Link>
          <div className="flex items-center space-x-6">
            <Link to="/products" className="text-gray-600 hover:text-primary">
              Products
            </Link>
            <Link to="/cart" className="relative">
              <FaShoppingCart className="text-2xl text-gray-600 hover:text-primary" />
              <span className="absolute -top-2 -right-2 bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                0
              </span>
            </Link>
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={toggleDropdown}
                className="flex items-center space-x-1 text-gray-600 hover:text-primary"
              >
                <FaUser />
                <span>user</span>
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-md z-10">
                  <Link
                    to="/user"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                    onClick={() => setDropdownOpen(false)}
                  >
                    User Profile
                  </Link>
                  <Link
                    to="/password-change"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Password Change
                  </Link>
                  <button
                    onClick={confirmLogout}
                    className="w-full text-left block px-4 py-2 text-gray-800 hover:bg-gray-200"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
