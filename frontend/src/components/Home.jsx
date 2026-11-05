import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // <-- 1. Import useNavigate

const Home = () => {
  const [products, setProducts] = useState([]);
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate(); // <-- 2. Initialize navigate

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/products");
        setProducts(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsError(true);
      }
    };
    fetchData();
  }, []);

  if (isError) {
    return <div className="container mt-5 text-center text-danger"><h3>Failed to connect to backend API! Make sure Spring Boot is running.</h3></div>;
  }

  return (
    <div className="container mt-4">
      <h2>Product Catalog</h2>
      <div className="row mt-4">
        {products.map((product) => (
          <div className="col-md-4 mb-4" key={product.id}>
            {/* 3. Card pe onClick aur style me cursor pointer laga diya */}
            <div 
              className="card h-100 shadow-sm" 
              style={{ cursor: "pointer" }} 
              onClick={() => navigate(`/product/${product.id}`)}
            >
              {/* <-- 4. Yahan product image add ki hai card ke upar display karne ke liye */}
              <img 
  src={`http://localhost:8080/api/product/${product.id}/image`} 
  alt={product.name} 
  className="card-img-top" 
  style={{ height: "200px", objectFit: "cover" }} 
/>

              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{product.brand} | {product.category}</h6>
                <p className="card-text">{product.description}</p>
                <p className="fw-bold text-success">₹ {product.price}</p>
                <p className="text-muted small">Quantity: {product.quantity}</p>
                <span className={`badge ${ (product.availability || product.Availability) ? 'bg-success' : 'bg-danger'}`}>
                  { (product.availability || product.Availability) ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;