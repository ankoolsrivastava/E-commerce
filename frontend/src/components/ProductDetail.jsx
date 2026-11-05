import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ProductDetail = () => {
    const { id } = useParams(); // URL se product ki ID nikalne ke liye
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Backend se specific product fetch kar rahe hain
        axios
            .get(`http://localhost:8080/api/product/${id}`)
            .then((response) => {
                setProduct(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching product details:", error);
                setLoading(false);
            });
    }, [id]);

    // =========================================================
    // DELETE PRODUCT HANDLER: Backend ko delete API call karega
    // =========================================================
    const deleteProduct = async () => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            try {
                await axios.delete(`http://localhost:8080/api/product/${id}`);
                alert("Product deleted successfully!");
                navigate("/"); // Delete hone ke baad user ko Home page par bhej denge
            } catch (error) {
                console.error("Error deleting product:", error);
                alert("Failed to delete product.");
            }
        }
    };

    if (loading) return <div className="text-center mt-5">Loading...</div>;
    if (!product) return <div className="text-center mt-5">Product not found!</div>;

    return (
        <div className="container mt-5" style={{ maxWidth: "800px" }}>
            
            {/* ========================================================= */}
            <div className="d-flex justify-content-between mb-3">
                {/* Back to Home Button */}
                <button className="btn btn-secondary" onClick={() => navigate("/")}>
                    ← Back to Home
                </button>

                {/* Right side buttons container (Update & Delete) */}
                <div>
                    {/* Update Product Button */}
                    <button 
                        className="btn btn-warning text-white me-2" 
                        onClick={() => navigate(`/update/${id}`)}
                    >
                        ✏️ Update Product
                    </button>

                    {/* Delete Product Button */}
                    <button 
                        className="btn btn-danger" 
                        onClick={deleteProduct}
                    >
                        🗑️ Delete Product
                    </button>
                </div>
            </div>

            <div className="card p-4 shadow-sm">
                {/* Product ki image load karne ke liye backend endpoint */}
                <div className="text-center mb-4">
                    <img
                        src={`http://localhost:8080/api/product/${id}/image`}
                        alt={product.name}
                        className="img-fluid rounded shadow-sm"
                        style={{ maxHeight: "350px", objectFit: "contain" }}
                    />
                </div>

                <h2 className="text-primary">{product.name}</h2>
                <h5 className="text-muted">Brand: {product.brand}</h5>
                <hr />
                <p>
                    <strong>Category:</strong> {product.category}
                </p>
                <p>
                    <strong>Description:</strong> {product.description}
                </p>
                <h4 className="text-success">₹ {product.price}</h4>
                <p>
                    <strong>Available Quantity:</strong> {product.quantity}
                </p>
                <p>
                    <strong>Release Date:</strong> {product.releaseDate}
                </p>
                <span className={`badge ${product.availability ? "bg-success" : "bg-danger"}`}>
                    {product.availability ? "In Stock" : "Out of Stock"}
                </span>
            </div>
        </div>
    );
};

export default ProductDetail;