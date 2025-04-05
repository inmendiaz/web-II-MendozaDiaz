import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../style/productDetail.css";
import ValidateToken from "../utils/ValidateToken";

export default function ProductDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [error, setError] = useState("");

    ValidateToken();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await fetch(`https://dummyjson.com/products/${id}`);
                const data = await res.json();
                setProduct(data);
            } catch (error) {
                console.error("Error al cargar el producto", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    const handleAddToCart = () => {
        if (!product) return;

        const stock = product.stock || 1;
        const qty = parseInt(quantity);

        if (qty > stock) {
            setError("No puedes agregar más productos de los que hay en existencia.");
            return;
        }

        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        // Verifica si ya existe
        const index = cart.findIndex(item => item.id === product.id);

        if (index !== -1) {
            const newQty = cart[index].quantity + qty;
            if (newQty > stock) {
                setError("No puedes superar el stock disponible.");
                return;
            }
            cart[index].quantity = newQty;
        } else {
            if (cart.length >= 5) {
                setError("Solo puedes tener hasta 5 productos diferentes.");
                return;
            }
            cart.push({ id: product.id, title: product.title, price: product.price, quantity: qty });
        }

        // Calcular el total
        const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        if (total > 10000) {
            setError("No puedes superar los $10,000 en el carrito.");
            return;
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        setError(""); // limpiar errores
        alert("Producto agregado al carrito.");
    };

    if (loading) return <p>Cargando producto...</p>;
    if (!product) return <h2>Producto no encontrado</h2>;

    return (
        <div className="product-detail">
            <img src={product.images?.[0]} alt={product.title} />
            <div className="product-detail-content">
                <button onClick={() => navigate(-1)}>← Volver</button>
                <h2>{product.title}</h2>
                <p><strong>Precio:</strong> ${product.price}</p>
                <p>{product.description}</p>
                <p><strong>Stock:</strong> {product.stock}</p>

                <div style={{ marginTop: "20px" }}>
                    <label>
                        Cantidad:{" "}
                        <input
                            type="number"
                            min="1"
                            max={product.stock}
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            style={{ width: "60px" }}
                        />
                    </label>
                    <button onClick={handleAddToCart} style={{ marginLeft: "10px" }}>
                        Agregar al carrito
                    </button>
                </div>

                {error && <p style={{ color: "red" }}>{error}</p>}
            </div>
        </div>
    );
}
