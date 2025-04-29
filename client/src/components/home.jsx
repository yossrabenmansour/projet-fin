import React from 'react';
import { Link } from 'react-router-dom';
import Shop from './Shop.jsx';
import menImg from '../assets/men.png';
import womenImg from '../assets/women.png';
import kidImg from '../assets/youth.png';
import bgImg from '../assets/bg.jpg'

const Home = ({ products, addToCart }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <section className="bg-cover bg-center h-screen" style={{ backgroundImage: `url(${bgImg})` }}>
        <div className="bg-black bg-opacity-50 h-full flex flex-col justify-center items-center text-center text-white px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-4">New Collection</h1>
          <p className="text-xl md:text-2xl mb-8">Discover the latest trends in fashion</p>
          <Link to="/shop" className="bg-white text-gray-900 py-2 px-4 rounded-full text-lg font-semibold hover:bg-gray-200 no-underline">Shop Now</Link>
        </div>
      </section>

      {/* Shop by Category Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">Shop by Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Men's Category */}
          <Link to="/shop/men" className="no-underline">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src={menImg} alt="Men's Fashion" className="w-full h-full object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">Men's Collection</h3>
                <p className="text-gray-600 mb-4">Explore our latest men's fashion</p>
              </div>
            </div>
          </Link>

          {/* Women's Category */}
          <Link to="/shop/women" className="no-underline">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src={womenImg} alt="Women's Fashion" className="w-full h-full object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">Women's Collection</h3>
                <p className="text-gray-600 mb-4">Discover our stylish women's clothing</p>
              </div>
            </div>
          </Link>

          {/* Kids' Category */}
          <Link to="/shop/kids" className="no-underline">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src={kidImg} alt="Kids' Fashion" className="w-full h-full object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">Kids' Collection</h3>
                <p className="text-gray-600 mb-4">Browse our adorable kids' outfits</p>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Featured Products Section */}
      <section id="featured" className="container mx-auto px-4 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">Our Best Sellers</h2>
        <Shop products={products.slice(0,3)} showFilters={false} addToCart={addToCart}  />
      </section>
    </div>
  );
};

export default Home;
