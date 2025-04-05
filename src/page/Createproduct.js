/* import { use, useEffect, useState } from "react";
import "../style/createproduct.css"; // si tienes estilos
import { useFormStatus } from "react-dom";

export default function CreateProduct() {
    const [categories, setCategories] = useState([])

    useEffect(() => {
        async function fetchCategories() {
            const response = await fetch("https://dummyjson.com/products/categories")
            const data = await response.json()
            setCategories(data);
        }

        fetchCategories()
    }, [])

    async function submitAction(formData){
        const data = Object.fromEntries(formData)
        const response = await CreateProductActions(data)
    }

   

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        const newProduct = {
            name,
            description,
            category,
            price: parseFloat(price),
        };

        console.log("Producto creado:", newProduct);

        // Aquí podrías hacer un POST al backend si lo tienes
        // fetch("/api/products", {...})
    };

    return (
        <div className="create-product-container">
            <h2>Crear Producto</h2>
            <form onSubmit={handleSubmit} className="create-product-form">
                <div>
                    <label>Title:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label>Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    ></textarea>
                </div>

                <div>
                    <label>Category</label>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                    >
                        {categories.map((category) => (
                            <option key={category.slug} value={category.slug}> {category.name} </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label>Price</label>
                    <input
                        type="number"
                        step="0.01"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                </div>

                <button type="submit">Save</button>
            </form>
        </div>
    );

    function ButtonSave() {
        const { pending } = useFormStatus();

        return (
            <button type="submit" disabled></button>
        )
    }
}
 */