import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const UpdateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

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

  // 1. Page load hote hi us product ki purani details fetch karke form me set karna
  useEffect(() => {
    axios.get(`http://localhost:8080/api/product/${id}`)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.error("Error fetching product for update:", error);
      });
  }, [id]);

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

  // 2. Update form submit handler
  const updateHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      
      // Agar user ne nayi image select ki hai tabhi append karenge
      if (image) {
        formData.append("imageFile", image);
      }

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

      const response = await axios.put(
        `http://localhost:8080/api/product/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );

      console.log("Updated Response:", response.data);
      alert("Product updated successfully!");
      navigate(`/product/${id}`); // Update hone ke baad wapas detail page par bhej denge

    } catch (error) {
      console.error("Error updating product:", error.response?.data || error);
      alert("Failed to update product. Check console.");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "600px" }}>
      <h2 className="mb-4">Update Product</h2>
      <form onSubmit={updateHandler} className="card p-4 shadow-sm">
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
        
        {/* Optional Image Change */}
        <div className="mb-3">
          <label className="form-label">Change Image (Optional)</label>
          <input type="file" className="form-control" accept="image/*" onChange={handleImageChange} />
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
        <button type="submit" className="btn btn-primary w-100">Update Product</button>
      </form>
    </div>
  );
};

export default UpdateProduct;