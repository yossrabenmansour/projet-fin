import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Product = ({ addToCart }) => {
  const [product, setProduct] = useState({})
  const { id } = useParams();
  // Fetch product details using the id
  // For simplicity, we use dummy data here
  useEffect(() => {
    axios.get(`http://localhost:5500/getProduct/${id}`)
      .then(res => {
        setProduct(res.data);
        console.log(res.data)
      })
      .catch(err => {
        console.error(err);
      });
  }, [id]);

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <img src={product.image} alt={product.name} className="w-full h-100 object-cover" />
        <div className="p-4">
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-gray-600 mb-4">${product.price}</p>
          <p className="text-gray-700 mb-8">{product.description}</p>
          <button
            onClick={() => {
              addToCart(product)
            }}
            className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600">Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default Product;
