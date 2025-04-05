
import { useEffect, useState } from "react";
import "../style/cart.css";

export default function Cart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const getTotal = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const clearCart = () => {
    if (window.confirm("¿Estás seguro de que quieres vaciar el carrito?")) {
      localStorage.removeItem("cart");
      setCart([]);
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>Carrito de compra</h2>

      {cart.length === 0 ? (
        <p>No hay productos en el carrito.</p>
      ) : (
        <>
          <ul>
            {cart.map((item) => (
              <li key={item.id} style={{ marginBottom: "15px" }}>
                <p><strong>{item.title}</strong></p>
                <p>Precio: ${item.price}</p>
                <p>Cantidad: {item.quantity}</p>
                <p>Subtotal: ${item.price * item.quantity}</p>
              </li>
            ))}
          </ul>

          <hr />
          <p><strong>Total:</strong> ${getTotal()}</p>

          <button onClick={clearCart} className="clear-cart-button">
            Vaciar carrito
          </button>
        </>
      )}
    </div>
  );
}