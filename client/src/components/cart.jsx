import React, { useState } from 'react';

const Cart = ({ cart, increaseQuantity, decreaseQuantity, removeFromCart, setCart }) => {
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  const handleQuantityChange = (product, newQuantity) => {
    if (newQuantity >= 1) {
      updateQuantity(product, newQuantity);
    }
  };

  const updateQuantity = (product, newQuantity) => {
    if (newQuantity >= 1) {
      if (newQuantity > product.quantity) {
        increaseQuantity(product._id);
      } else if (newQuantity < product.quantity) {
        decreaseQuantity(product._id);
      }
    }
  };

  const handleCheckout = () => {

    setCheckoutSuccess(true);

    // Empty the cart
    setCart([]);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-4">Shopping Cart</h2>
      {checkoutSuccess && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Order placed successfully!</strong>
          <span className="block sm:inline"> Your order has been successfully placed.</span>
          <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
            <svg
              className="fill-current h-6 w-6 text-green-500"
              role="button"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              onClick={() => setCheckoutSuccess(false)}
            >
              <title>Close</title>
              <path
                fillRule="evenodd"
                d="M14.293 5.293a1 1 0 0 1 1.414 1.414L11.414 10l4.293 4.293a1 1 0 1 1-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 1 1-1.414-1.414L8.586 10 4.293 5.707a1 1 0 0 1 1.414-1.414L10 8.586l4.293-4.293z"
              />
            </svg>
          </span>
        </div>
      )}
      {cart.length === 0 ? (
        <p className="text-lg">Your cart is empty.</p>
      ) : (
        <div className="bg-white shadow-md rounded-lg">
          <ul className="divide-y divide-gray-200">
            {cart.map((product) => (
              <li key={product._id} className="flex items-center justify-between p-4">
                <div className="flex items-center">
                  <img src={product.image} alt={product.name} className="w-16 h-16 object-cover mr-4" />
                  <div>
                    <h3 className="font-semibold text-lg">{product.name}</h3>
                    <p className="text-gray-600">{product.description}</p>
                    <div className="flex mt-2">
                      <button
                        onClick={() => handleQuantityChange(product, product.quantity - 1)}
                        className="font-bold text-red-500 hover:text-red-700 focus:outline-none"
                      >
                        -
                      </button>
                      <span className="mx-2">{product.quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(product, product.quantity + 1)}
                        className="font-bold text-green-500 hover:text-green-700 focus:outline-none"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">${(product.price * product.quantity).toFixed(2)}</p>
                  <button
                    onClick={() => removeFromCart(product._id)}
                    className="text-red-500 hover:text-red-700 ml-4 focus:outline-none"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="p-4 flex justify-end items-center">
            <button
              onClick={handleCheckout}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md mr-4"
            >
              Checkout
            </button>
            <p className="text-lg font-bold">
              Total: ${cart.reduce((acc, curr) => acc + curr.price * curr.quantity, 0).toFixed(2)}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
