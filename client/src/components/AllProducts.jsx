import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AllProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);
  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5500/getProducts');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  };
  const handleDelete = async (id) => {


    try {
      await axios.delete(`http://localhost:5500/deleteProduct/${id}`);
      fetchProducts();
    } catch (error) {
      console.error('Error deleting expense:', error);
    }

  };


  return (
    <form id="form">


      <table id="example" className="table table-striped table-bordered" width="100%">
        <thead>
          <tr>
            <th className="head">Name</th>
            <th className="head">category</th>
            <th className="head">description</th>
            <th className="head">price</th>
            <th className="head">image</th>
            <th className="head">quantity</th>
            <th className="head">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, i) => (
            <tr key={i}>
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>{product.description}</td>
              <td>{product.price}</td>
              <td>{product.image}</td>
              <td>{product.quantity}</td>
              <td>
                <input
                  type="button"
                  value="Delete"
                  onClick={() => { handleDelete(product._id) }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </form>
  );
}
export default AllProducts;