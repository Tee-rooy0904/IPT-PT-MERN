import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetchProducts();
  }, []);
  
  const fetchProducts = async () => {
    try {
        const response = await axios.get('http://localhost:8888/api/products');
      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false);
    }
  };
  
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await axios.delete(`http://localhost:8888/api/products/${id}`);
        alert('Product deleted successfully!');
        // Refresh the product list
        fetchProducts();
      } catch (error) {
        console.error('Error deleting product:', error);
        alert('Failed to delete product');
      }
    }
  };
  
  if (loading) {
    return (
      <div className="container-fluid" style={{backgroundImage: "url(/mountain.jpg)", height: "100vh", backgroundRepeat: "no-repeat", backgroundSize: "cover"}}>
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card" style={{background: "transparent", border: "1px", marginTop: "20vh", padding: "20px", backdropFilter: "blur(20px)"}}>
              <div className="text-center text-white">
                <h3>Loading products...</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container-fluid" style={{backgroundImage: "url(/mountain.jpg)", minHeight: "100vh", backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundAttachment: "fixed"}}>
      <div className="row justify-content-center">
        <div className="col-md-10">
          <div className="card" style={{background: "transparent", border: "1px", marginTop: "5vh", marginBottom: "5vh", padding: "20px", backdropFilter: "blur(20px)"}}>
            <div className="h1 text-center text-white mb-4">Product Management</div>
            
            <div className="text-end mb-3">
              <Link 
                to="/add" 
                className="btn btn-light"
                style={{
                  borderRadius: "40px", 
                  fontSize: "16px",
                  border: "none", 
                  fontWeight: "600",
                  boxShadow: "0 0 10px rgba(0, 0, 0, .1)",
                  padding: "8px 20px"
                }}
              >
                Add New Product
              </Link>
            </div>
            
            {products.length === 0 ? (
              <div className="text-center text-white">
                <h3>No products found</h3>
                <p>Get started by adding some products!</p>
              </div>
            ) : (
              <div className="row row-cols-1 row-cols-md-3 g-4">
                {products.map(product => (
                  <div className="col" key={product._id}>
                    <div className="card h-100" style={{background: "rgba(255, 255, 255, 0.2)", backdropFilter: "blur(10px)"}}>
                      {product.imageUrl && (
                        <img 
                          src={product.imageUrl} 
                          className="card-img-top" 
                          alt={product.name}
                          style={{height: "200px", objectFit: "cover"}}
                        />
                      )}
                      <div className="card-body text-white">
                        <h5 className="card-title">{product.name}</h5>
                        <p className="card-text">{product.description}</p>
                        <p className="card-text"><strong>Price:</strong> ${product.price.toFixed(2)}</p>
                        <p className="card-text"><strong>Category:</strong> {product.category}</p>
                        <p className="card-text"><strong>In Stock:</strong> {product.stockQuantity}</p>
                        
                        <div className="d-flex justify-content-between mt-3">
                          <Link 
                            to={`/edit/${product._id}`} 
                            className="btn btn-info"
                            style={{borderRadius: "20px", padding: "5px 15px"}}
                          >
                            Edit
                          </Link>
                          <button 
                            onClick={() => handleDelete(product._id)} 
                            className="btn btn-danger"
                            style={{borderRadius: "20px", padding: "5px 15px"}}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductList;