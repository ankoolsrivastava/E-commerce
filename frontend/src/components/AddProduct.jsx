import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    brand: "",
    price: "",
    category: "",
    releaseDate: "",
    availability: true,
    quantity: ""
  });

  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProduct({
      ...product,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
        const formData = new FormData();
        
        // Backend ke @RequestPart MultipartFile imageFile ke sath match karega
        formData.append("imageFile", image);

        // Backend ke @RequestPart Product product ke sath match karega (JSON Blob)
        const productObj = {
            name: product.name,
            brand: product.brand,
            category: product.category,
            description: product.description,
            price: Number(product.price),
            quantity: Number(product.quantity),
            releaseDate: product.releaseDate,
            availability: product.availability
        };

        formData.append(
            "product", 
            new Blob([JSON.stringify(productObj)], { type: "application/json" })
        );

        console.log("Sending Product with Image...");

        const response = await axios.post(
            "http://localhost:8080/api/add",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data"
              }
            }
        );

        console.log("Backend Response:", response.data);
        alert("Product added successfully!");
        navigate("/");

    } catch (error) {
        console.error("Error adding product:", error.response?.data || error);
        alert(
            error.response?.data?.message ||
            "Failed to add product. Check console."
        );
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "600px" }}>
      <h2 className="mb-4">Add New Product</h2>
      <form onSubmit={submitHandler} className="card p-4 shadow-sm">
        <div className="mb-3">
          <label className="form-label">Product Name</label>
          <input type="text" className="form-control" name="name" value={product.name} onChange={handleInputChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Brand</label>
          <input type="text" className="form-control" name="brand" value={product.brand} onChange={handleInputChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Category</label>
          <input type="text" className="form-control" name="category" value={product.category} onChange={handleInputChange} required />
        </div>
        
        {/* Gallery / File Picker */}
        <div className="mb-3">
          <label className="form-label">Product Image</label>
          <input type="file" className="form-control" accept="image/*" onChange={handleImageChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea className="form-control" name="description" value={product.description} onChange={handleInputChange} rows="3" required></textarea>
        </div>
        <div className="mb-3">
          <label className="form-label">Price (₹)</label>
          <input type="number" step="0.01" className="form-control" name="price" value={product.price} onChange={handleInputChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Quantity</label>
          <input type="number" className="form-control" name="quantity" value={product.quantity} onChange={handleInputChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Release Date</label>
          <input type="date" className="form-control" name="releaseDate" value={product.releaseDate} onChange={handleInputChange} required />
        </div>
        <div className="mb-3 form-check">
          <input type="checkbox" className="form-check-input" name="availability" checked={product.availability} onChange={handleInputChange} id="availabilityCheck" />
          <label className="form-check-label" htmlFor="availabilityCheck">Available in Stock</label>
        </div>
        <button type="submit" className="btn btn-primary w-100">Submit Product</button>
      </form>
    </div>
  );
};

export default AddProduct;