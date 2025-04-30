import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddProduct() {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    imageUrl: '',
    stockQuantity: ''
  });
  
  const navigate = useNavigate();
  
  const handleChange = (e) => {
    const { id, value } = e.target;
    setProduct(prevProduct => ({
      ...prevProduct,
      [id]: value
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Convert string values to numbers
    const productToSubmit = {
      ...product,
      price: parseFloat(product.price),
      stockQuantity: parseInt(product.stockQuantity)
    };
    
    try {
      await axios.post('http://localhost:8888/api/products', productToSubmit);
      alert('Product added successfully!');
      navigate('/');
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Failed to add product');
    }
  };
  
  // Log that the component is mounting
  console.log('AddProduct component rendering');
  
  return (
    <div style={{
      backgroundImage: "url(/mountain.jpg)", 
      minHeight: "100vh", 
      backgroundRepeat: "no-repeat", 
      backgroundSize: "cover",
      backgroundPosition: "center",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px"
    }}>
      <div style={{
        width: "100%",
        maxWidth: "600px",
        background: "rgba(255, 255, 255, 0.15)", 
        borderRadius: "15px", 
        padding: "30px", 
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)", // For Safari
        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
        border: "1px solid rgba(255, 255, 255, 0.3)"
      }}>
        <h1 style={{color: "white", textAlign: "center", marginBottom: "20px"}}>Add New Product</h1>
        <form onSubmit={handleSubmit}>
          <div style={{marginBottom: "15px"}}>
            <label style={{display: "block", color: "white", marginBottom: "5px"}}>Product Name</label>
            <input 
              type="text" 
              id="name" 
              value={product.name}
              onChange={handleChange}
              required
              style={{
                width: "100%", 
                padding: "10px", 
                borderRadius: "5px", 
                background: "rgba(255, 255, 255, 0.2)", 
                color: "white", 
                border: "none"
              }}
            />
          </div>
          
          <div style={{marginBottom: "15px"}}>
            <label style={{display: "block", color: "white", marginBottom: "5px"}}>Description</label>
            <textarea 
              id="description" 
              value={product.description}
              onChange={handleChange}
              required
              rows="3"
              style={{
                width: "100%", 
                padding: "10px", 
                borderRadius: "5px", 
                background: "rgba(255, 255, 255, 0.2)", 
                color: "white", 
                border: "none"
              }}
            />
          </div>
          
          <div style={{display: "flex", gap: "15px", marginBottom: "15px"}}>
            <div style={{flex: 1}}>
              <label style={{display: "block", color: "white", marginBottom: "5px"}}>Price ($)</label>
              <input 
                type="number" 
                step="0.01" 
                id="price" 
                value={product.price}
                onChange={handleChange}
                required
                style={{
                  width: "100%", 
                  padding: "10px", 
                  borderRadius: "5px", 
                  background: "rgba(255, 255, 255, 0.2)", 
                  color: "white", 
                  border: "none"
                }}
              />
            </div>
            
            <div style={{flex: 1}}>
              <label style={{display: "block", color: "white", marginBottom: "5px"}}>Category</label>
              <input 
                type="text" 
                id="category" 
                value={product.category}
                onChange={handleChange}
                required
                style={{
                  width: "100%", 
                  padding: "10px", 
                  borderRadius: "5px", 
                  background: "rgba(255, 255, 255, 0.2)", 
                  color: "white", 
                  border: "none"
                }}
              />
            </div>
          </div>
          
          <div style={{marginBottom: "15px"}}>
            <label style={{display: "block", color: "white", marginBottom: "5px"}}>Image URL</label>
            <input 
              type="text" 
              id="imageUrl" 
              value={product.imageUrl}
              onChange={handleChange}
              style={{
                width: "100%", 
                padding: "10px", 
                borderRadius: "5px", 
                background: "rgba(255, 255, 255, 0.2)", 
                color: "white", 
                border: "none"
              }}
            />
          </div>
          
          <div style={{marginBottom: "25px"}}>
            <label style={{display: "block", color: "white", marginBottom: "5px"}}>Stock Quantity</label>
            <input 
              type="number" 
              id="stockQuantity" 
              value={product.stockQuantity}
              onChange={handleChange}
              required
              style={{
                width: "100%", 
                padding: "10px", 
                borderRadius: "5px", 
                background: "rgba(255, 255, 255, 0.2)", 
                color: "white", 
                border: "none"
              }}
            />
          </div>
          
          <button 
            type="submit" 
            style={{
              width: "100%",
              padding: "12px 0",
              borderRadius: "40px", 
              fontSize: "16px",
              border: "none", 
              background: "rgba(255, 255, 255, 0.25)",
              color: "white",
              fontWeight: "600",
              cursor: "pointer",
              boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
              marginBottom: "15px"
            }}
          >
            Add Product
          </button>
          
          <div style={{textAlign: "center"}}>
            <a 
              href="/" 
              style={{
                display: "inline-block",
                padding: "8px 20px",
                borderRadius: "30px",
                border: "1px solid white",
                color: "white",
                textDecoration: "none",
                fontWeight: "500"
              }}
            >
              Back to Products
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;