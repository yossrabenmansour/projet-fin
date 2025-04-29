import React, { useState ,useEffect } from 'react';
import { Link ,useNavigate } from "react-router-dom";
import axios from 'axios'

const Shop = ({ products = [], showFilters = true, addToCart, cart }) => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [data,setData] = useState([])
  const navigate = useNavigate()

  
  const handleCategoryChange = (category) => {
    setSelectedCategory((prevCategory) => (prevCategory === category ? '' : category));
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const clearFilter = () => {
    setSelectedCategory('');
    setSearchTerm('');
  };

  const hundeldata = async ()=>{
    try {
    
      const response = await axios.get('http://localhost:5500/shop')
      console.log(response.data)
       setData(response.data)
     
    
    }catch(err){
      console.log(err)
    }

   }

  useEffect(()=>{
   hundeldata()
  },[])

  const filteredProducts = products.filter((product) => {
    if (selectedCategory && product.category !== selectedCategory) {
      return false;
    }
    if (searchTerm && !product.name.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    return true;
  });

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="flex">
        {showFilters && (
          <div className="w-1/4 p-4 -ml-20">
            <h2 className="text-2xl font-bold mb-4">Filter by Category</h2>
            <div>
              <button
                className={`btn ${selectedCategory === 'men' ? 'bg-blue-500 text-black' : 'bg-gray-200'} py-2 px-4 rounded-full mb-2`}
                onClick={() => handleCategoryChange('men')}
              >
                Men
              </button>
            </div>
            <div>
              <button
                className={`btn ${selectedCategory === 'women' ? 'bg-blue-500 text-black' : 'bg-gray-200'} py-2 px-4 rounded-full mb-2`}
                onClick={() => handleCategoryChange('women')}
              >
                Women
              </button>
            </div>
            <div>
              <button
                className={`btn ${selectedCategory === 'kids' ? 'bg-blue-500 text-black' : 'bg-gray-200'} py-2 px-4 rounded-full mb-2`}
                onClick={() => handleCategoryChange('kids')}
              >
                Kids
              </button>
            </div>
            <div>
              <button
                className="bg-red-400 text-white py-2 px-4 rounded-full mt-4"
                onClick={clearFilter}
              >
                Clear Filter
              </button>
            </div>
          </div>
        )}
        <div className={showFilters ? "w-3/4" : "w-full"}>
          <div className="flex items-center mb-4">
            {showFilters && (
              <input
                type="text"
                placeholder="Search products"
                value={searchTerm}
                onChange={handleSearchChange}
                className="px-4 py-2 border border-gray-300 rounded-lg w-full"
              />
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <div key={product._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <Link to={`/product/${product._id}`}>
                  <img src={product.image} alt="Product" className="w-full h-64 object-cover" />
                </Link>
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-4">${product.price}</p>
                  <button
                    onClick={() => addToCart(product)}
                    className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 no-underline"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;