import React from "react";
import { Link, useNavigate } from "react-router-dom";


const Navbar = ({ handleToken, token, cart }) => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token")
    handleToken("")
    navigate('/login')

};

  return (
    <nav className="bg-white shadow">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/#" className="text-black text-xl font-bold no-underline">ClothingShop</Link>
        <div className="hidden md:flex space-x-4">
          <Link to="/" className="text-gray-600 hover:text-gray-900 no-underline">Home</Link>
          <Link to="/shop" className="text-gray-600 hover:text-gray-900 no-underline">Shop</Link>
          <Link to="/about" className="text-gray-600 hover:text-gray-900 no-underline">About</Link>
          <Link to="/contact" className="text-gray-600 hover:text-gray-900 no-underline">Contact</Link>
          <Link to="/cart" className="text-gray-600 hover:text-gray-900 no-underline relative">
            Cart
            {cart.length > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {cart.length}
              </span>
            )}
          </Link>
          {token ? (
            <button
              onClick={logout}
              className="text-gray-600 hover:text-gray-900 no-underline btn btn-danger"
            >
              Logout
            </button>
          ) : (
            <Link to="/login" className="text-gray-600 hover:text-gray-900 no-underline">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
