import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/Auth';

function Navbar() {
  const { user, Logout } = useAuth();
  
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-white font-bold">
          Notes app
        </div>

        {/* Navigation Links */}
        <div className="space-x-4">
          {user ? (
            <>
              <Link to="/" className="text-white hover:text-gray-300">Home</Link>
              <Link to="/notes" className="text-white hover:text-gray-300">Notes</Link>
              <button>
                  <Link to='/Notes/create' className="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">
                    create note
                  </Link>
              </button>
              <button onClick={Logout} className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Logout</button>
            </>
          ) : (
            <>
              <Link to="/" className="text-white hover:text-gray-300">Home</Link>
              <Link to="/register" className="text-white hover:text-gray-300">Register</Link>
              <Link to="/login" className="text-white hover:text-gray-300">Login</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
