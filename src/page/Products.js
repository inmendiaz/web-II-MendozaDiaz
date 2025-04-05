import { useEffect, useState } from "react";
import ValidateToken from "../utils/ValidateToken";
import ProductListItem from "../components/ProductListItem";


export default function Products(){
    ValidateToken();
    const [products, setProducts] = useState(null);
    const [productId, setProductId] = useState(null);
    const [word, setWord] = useState(null);
    const [newProduct, setNewProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const [query, setQuery] = useState('');
  
    useEffect(() => {
  
    }
    )
  
    useEffect(() => {
      
      const fetchProducts = async () => {
        setLoading(true);
        try {
          const data = await getProducts();
          setProducts(data.products);
        } catch (error) {
          setErrorMessage(error.message);
        } finally {
          setLoading(false);
        }
        //const data = await getProducts();
        //setProducts(data.products);
      }
      fetchProducts();
    }, []);
  
    useEffect(() => {
      const hasWord = word !== null && word !== undefined && word.length > 3;
      if (!hasWord) return;
  
      const fetchProductsByWord = async () => {
        setLoading(true);
        try {
          const data = await getProductsByWord(word);
          setProducts(data.products);
        } catch (error) {
          setErrorMessage(error.message);
        } finally {
          setLoading(false);
        }
        //const data = await getProductsByWord(word);
        //setProducts(data.products);
      }
  
      fetchProductsByWord();
    }, [word]);
  
    return (
      <div>
        <h1>Products</h1>
        <div className="container-products">
          <input type="text" placeholder="Search" onChange={(e) => setWord(e.target.value)} />
          {loading ? (
            <p> Cargando...</p>
          ) : errorMessage ? (
            <p>{errorMessage}</p>
          ) : (
            products && products.length === 0 ? (
              <p>No se encontraron productos</p>
            ) : products ? (
              <>
                <p>Total encontrados: {products.length}</p>
                {products.map((item) => (
                  <ProductListItem 
                    key={item.id}
                    title={item.title} 
                    id={item.id}
                    description={item.description} 
                    images={item.images} 
                  />
                ))}
              </>
            ) : (
              <p>No se encontraron productos</p>
            )
          )}
        </div>
      </div>
    )
  }
  
  async function getProducts(){
    const response = await fetch("https://dummyjson.com/products");
    const data = await response.json();
    return data;
  }
  
  async function getProductsByWord(word){
    const response = await fetch(`https://dummyjson.com/products/search?q=${word}`);
    const data = await response.json();
    return data;
  }