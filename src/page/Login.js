import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/Login.css";

export default function Login() {
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault(); // prevenir que el formulario recargue la página

        try {
            const response = await fetch("https://dummyjson.com/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: user,
                    password: password,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                // guardar el token y redirigir
                localStorage.setItem("token", data.token);
                navigate("/products"); // o la ruta que uses después del login
            } else {
                alert("Usuario o contraseña incorrectos.");
                console.error("Error:", data);
            }
        } catch (error) {
            console.error("Error de red:", error);
        }
    };

    return (
        <div>
            <div className="containerLogin">
                <h3>Login</h3>
                <form className="formLogin" onSubmit={handleLogin}>
                    <div>
                        <input
                            className="login-input"
                            type="text"
                            placeholder="User"
                            name="user"
                            value={user}
                            onChange={(e) => setUser(e.target.value)}
                        />
                    </div>

                    <div>
                        <input
                            className="login-input"
                            type="password" // typo corregido aquí
                            placeholder="Password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="login-button-container">
                        <button className="login-button" type="submit">Login</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
