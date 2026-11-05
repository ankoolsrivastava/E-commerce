import React from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import AddProduct from "./components/AddProduct";
import ProductDetail from "./components/ProductDetail";
import UpdateProduct from "./components/UpdateProduct";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add_product" element={<AddProduct />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        {/* <-- 2. Yeh wala route add karna zaroori hai */}
        <Route path="/update/:id" element={<UpdateProduct />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
