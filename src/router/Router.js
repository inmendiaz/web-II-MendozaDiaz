import { Routes, Route } from "react-router-dom";

import Home from '../page/Home';
import About from '../page/About';
import Contact from '../page/Contact';
import Login from "../page/Login";
import ProductList from "../page/ProductList";
import ProductDetail from "../page/ProductDetail";
import Products from "../page/Products";
import Cart from "../page/Cart";
// import CreateProduct from "../page/Createproduct";

export default function MyRouters() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/products" element={<Products />} />

            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            {/* <Route path="/createproduct" element={<CreateProduct />} /> */}
        </Routes>
    )
}