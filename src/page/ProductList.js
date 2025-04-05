import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ValidateToken from "../utils/ValidateToken";
import ProductListItem from "../components/ProductListItem";
import '../style/products.css';

export default function ProductList() {
  const [products, setProducts] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProducts();
      setProducts(data.products);
    };
    fetchProducts();
  }, []);

  const handleSearch = async () => {
    if (searchTerm.trim() === "") {
      const data = await getProducts();
      setProducts(data.products);
    } else {
      const data = await getProductsByWord(searchTerm);
      setProducts(data.products);
    }
  };

  ValidateToken();

  return (
    <div>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Buscar productos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Buscar</button>
      </div>

      <div className="container-products">
        {products && products.length > 0 ? (
          products.map((item) => (
            <ProductListItem
              key={item.id}
              title={item.title}
              id={item.id}
              description={item.description}
              images={item.images}
            />
          ))
        ) : (
          <p>No se encontraron productos.</p>
        )}
      </div>
    </div>
  );
}

async function getProducts() {
  const response = await fetch("https://dummyjson.com/products");
  return response.json();
}

async function getProductsByWord(word) {
  const response = await fetch(`https://dummyjson.com/products/search?q=${word}`);
  return response.json();
}
