import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
  const [keyword, setKeyword] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  // Live Search Effect with 300ms debounce
  useEffect(() => {
    if (keyword.trim() === "") {
      setSuggestions([]);
      return;
    }

    const delayDebounceFn = setTimeout(() => {
      axios.get(`http://localhost:8080/api/products/search?keyword=${keyword}`)
        .then((response) => {
          setSuggestions(response.data);
        })
        .catch((error) => {
          console.error("Error searching products:", error);
        });
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [keyword]);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <div className="container-fluid">
        {/* Brand Logo */}
        <Link className="navbar-brand" to="/">E-Commerce Store</Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          {/* Left Navigation Links */}
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/add_product">Add Product</Link>
            </li>
          </ul>

          {/* Search Bar with Live Suggestions Dropdown */}
          <div className="position-relative mx-auto" style={{ width: "350px" }}>
            <input
              type="text"
              className="form-control"
              placeholder="Search products..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />

            {/* Suggestions Dropdown */}
            {suggestions.length > 0 && (
              <ul 
                className="list-group position-absolute w-100 shadow mt-1" 
                style={{ zIndex: 1000, maxHeight: "300px", overflowY: "auto" }}
              >
                {suggestions.map((prod) => (
                  <li 
                    key={prod.id} 
                    className="list-group-item list-group-item-action"
                    onClick={() => {
                      navigate(`/product/${prod.id}`);
                      setKeyword("");
                      setSuggestions([]);
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    <div className="d-flex justify-content-between align-items-center">
                      <span>{prod.name}</span>
                      <small className="text-muted">₹{prod.price}</small>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;