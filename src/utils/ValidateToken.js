import { useEffect } from "react";

export default function ValidateToken() {
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            window.location.href = "/login";
        }
    }, []);
}
