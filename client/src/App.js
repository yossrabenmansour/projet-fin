import React, { useEffect, useState } from 'react';
import { useLocation, Route, Routes,useNavigate } from 'react-router-dom';
import axios from 'axios';

import Home from './components/home.jsx';
import Shop from './components/Shop.jsx';
import About from './components/about.jsx';
import Contact from './components/contact.jsx';
import Login from './components/login.jsx';
import Product from './components/product.jsx';
import Register from './components/register.jsx';
import Dashboard from './components/dashboard.jsx';
import Men from './components/pages/men.jsx';
import Women from './components/pages/women.jsx';
import Kids from './components/pages/kids.jsx';
import Navbar from './components/navbar.jsx';
import Footer from './components/footer.jsx';
import Cart from './components/cart.jsx';
import Reclamations from './components/reclamation.jsx';
import Addproduct from './components/addproduct.jsx'

const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [token, setToken] = useState('');
  const [current,setCurrent] = useState([]) 
  const [newdata,setNewdata] = useState([])


   const getdata = (data)=>{
    setCurrent(data)
   }

   const getnewdata = (data)=>{
    setNewdata(data)
   }




  useEffect(() => {
    axios.get('http://localhost:5500/getProducts')
      .then((res) => {
        setProducts(res.data);
        const cartItems = res.data.filter(product => product.quantity > 0);
        setCart(cartItems);
      })
      .catch(error => console.error('Error fetching products:', error));
  }, [])
  ;
  
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setToken(token);
  }, []);





  const location = useLocation();




  const handleToken = (value) => {
    setToken(value);
  };



  const addToCart = (product) => {
    if (token){
      const existingProduct = cart.find(item => item._id === product._id);
      if (existingProduct) {
        increaseQuantity(product._id);
      } else {
        const updatedProduct = { ...product, quantity: 1 };
        setCart((prevCart) => [...prevCart, updatedProduct]);
        axios.patch(`http://localhost:5500/updateProduct/${product._id}`, { quantity: 1 })
          .catch(error => console.error('Error updating product:', error));
      }
    }
    else{
      navigate('/login', { state: { message: 'Please login !!' } });

    }
  
  };





  const increaseQuantity = (productId) => {
    const existingProduct = cart.find(item => item._id === productId);
    if (existingProduct) {
      const updatedProduct = { ...existingProduct, quantity: existingProduct.quantity + 1 };
      axios.patch(`http://localhost:5500/updateProduct/${productId}`, updatedProduct)
        .then((res) => {
          setCart((prevCart) => prevCart.map(item => item._id === productId ? res.data : item));
        })
        .catch(error => console.error('Error updating product:', error));
    }
  };





  const decreaseQuantity = (productId) => {
    const existingProduct = cart.find(item => item._id === productId);
    if (existingProduct && existingProduct.quantity > 1) {
      const updatedProduct = { ...existingProduct, quantity: existingProduct.quantity - 1 };
      axios.patch(`http://localhost:5500/updateProduct/${productId}`, updatedProduct)
        .then((res) => {
          setCart((prevCart) => prevCart.map(item => item._id === productId ? res.data : item));
        })
        .catch(error => console.error('Error updating product:', error));
    } else {
      removeFromCart(productId);
    }
  };








  const removeFromCart = (productId) => {
    axios.patch(`http://localhost:5500/updateProduct/${productId}`, { quantity: 0 })
      .then(() => {
        setCart((prevCart) => prevCart.filter(item => item._id !== productId));
      })
      .catch(error => console.error('Error updating product:', error));
  };








  return (
    <div>
      {location.pathname !== '/dashboard' && location.pathname !== '/addproduct' && location.pathname!== '/reclamation' && <Navbar handleToken={handleToken} token={token} cart={cart} />}
      <Routes>
        <Route path="/" element={<Home products={products} addToCart={addToCart} />} />
        <Route path="/shop" element={<Shop products={products} addToCart={addToCart} cart={cart} />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login handleToken={handleToken} />} />
        <Route path="/dashboard" element={<Dashboard  getdata={getdata} token={token} newdata={newdata} handleToken={handleToken} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/shop/men" element={<Men products={products} addToCart={addToCart} />} />
        <Route path="/shop/women" element={<Women products={products} addToCart={addToCart} />} />
        <Route path="/shop/kids" element={<Kids products={products} addToCart={addToCart} />} />
        <Route/>
        <Route
          path="/cart"
          element={<Cart cart={cart} increaseQuantity={increaseQuantity} decreaseQuantity={decreaseQuantity} removeFromCart={removeFromCart} setCart={setCart} />}
        />
        <Route path="/reclamation" element={<Reclamations/>}/>
        <Route path='/addproduct' getnewdata={getnewdata}  products={products} element ={<Addproduct/>}/>
      </Routes>
      {location.pathname !=="/addproduct" &&   <Footer />}
    
    </div>
  );
};

export default App;
