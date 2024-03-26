import React, { useRef } from 'react';
import { useAuth } from '../contexts/Auth';

function Register() {
  const { Register } = useAuth(); // Assuming `register` is the function for registering users in your authentication context

  const registerRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(registerRef.current);
    const data = Object.fromEntries(formData);
    Register(data); // Assuming `register` is the function for registering users in your authentication context
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <form onSubmit={handleSubmit} ref={registerRef} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <h1 className="text-3xl font-bold text-center mb-6">Register</h1>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            name="email"
            placeholder="Type your email..."
            // Add a ref attribute to capture the input value
            ref={registerRef}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            name="password"
            placeholder="Type your password..."
            // Add a ref attribute to capture the input value
            ref={registerRef}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
}

export default Register;
