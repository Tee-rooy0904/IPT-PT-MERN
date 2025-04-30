import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    imageUrl: '',
    stockQuantity: ''
  });
  
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:8888/api/products/${id}`);
        const productData = response.data;
        
        setProduct({
          name: productData.name,
          description: productData.description,
          price: productData.price,
          category: productData.category,
          imageUrl: productData.imageUrl || '',
          stockQuantity: productData.stockQuantity
        });
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product:', error);
        alert('Failed to load product data');
        navigate('/');
      }
    };
    
    fetchProduct();
}, [id, navigate]);
  
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
        await axios.put(`http://localhost:8888/api/products/${id}`, productToSubmit);
        alert('Product updated successfully!');
        navigate('/');
      } catch (error) {
        console.error('Error updating product:', error);
        alert('Failed to update product');
      }
    };
  
  if (loading) {
    return (
      <div className="container-fluid" style={{backgroundImage: "url(/mountain.jpg)", height: "100vh", backgroundRepeat: "no-repeat", backgroundSize: "cover"}}>
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card" style={{background: "transparent", border: "1px", marginTop: "20vh", padding: "20px", backdropFilter: "blur(20px)"}}>
              <div className="text-center text-white">
                <h3>Loading product data...</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container-fluid" style={{backgroundImage: "url(/mountain.jpg)", height: "100vh", backgroundRepeat: "no-repeat", backgroundSize: "cover"}}>
      <div className="row">
        <div className="col-md-4 col-sm-6 col mb-4"></div>
        <div className="col-md-4 col-sm-6 col mb-4">
          <div className="card" style={{width: "auto", background: "transparent", border: "1px", marginTop: "10vh", padding: "40px 50px", backdropFilter: "blur(20px)"}}>
            <div className="h1 text-center header text-white">
              Edit Product
            </div>
            <div className="h4 text-center header text-info mb-4" style={{fontFamily: "Verdana, Geneva, Tahoma, sans-serif", fontWeight: "bold"}}>
              {product.name}
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label text-white">Product Name</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="name" 
                    value={product.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="mb-3">
                  <label htmlFor="description" className="form-label text-white">Description</label>
                  <textarea 
                    className="form-control" 
                    id="description" 
                    value={product.description}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="mb-3">
                  <label htmlFor="price" className="form-label text-white">Price ($)</label>
                  <input 
                    type="number" 
                    step="0.01" 
                    className="form-control" 
                    id="price" 
                    value={product.price}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="mb-3">
                  <label htmlFor="category" className="form-label text-white">Category</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="category" 
                    value={product.category}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="mb-3">
                  <label htmlFor="imageUrl" className="form-label text-white">Image URL</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="imageUrl" 
                    value={product.imageUrl}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="mb-3">
                  <label htmlFor="stockQuantity" className="form-label text-white">Stock Quantity</label>
                  <input 
                    type="number" 
                    className="form-control" 
                    id="stockQuantity" 
                    value={product.stockQuantity}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="d-grid gap-2">
                  <button 
                    type="submit" 
                    className="btn btn-info text-white"
                    style={{
                      borderRadius: "40px", 
                      fontSize: "16px",
                      border: "none", 
                      outline: "none", 
                      height: "45px", 
                      fontWeight: "600",
                      cursor: "pointer", 
                      boxShadow: "0 0 10px rgba(0, 0, 0, .1)"
                    }}
                  >
                    Update Product
                  </button>
                  
                  <button 
                    type="button" 
                    className="btn btn-light"
                    style={{
                      borderRadius: "40px", 
                      fontSize: "16px",
                      border: "none", 
                      outline: "none", 
                      height: "45px", 
                      fontWeight: "600",
                      cursor: "pointer", 
                      boxShadow: "0 0 10px rgba(0, 0, 0, .1)"
                    }}
                    onClick={() => navigate('/')}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="col-md-4 col-sm-4 col xs-12"></div>
      </div>
    </div>
  );
}

export default EditProduct;