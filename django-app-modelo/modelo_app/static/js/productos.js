async function agregarProducto() {
    const name = document.getElementById("nombreProducto").value;
    const precio = parseFloat(document.getElementById("precioProducto").value);
    const localidadId = document.getElementById("localidadId").value;

    if (!name || isNaN(precio) || precio <= 0 || !localidadId) {
        alert("Todos los campos son obligatorios y el precio debe ser mayor a 0.");
        return;
    }

    const url = "http://127.0.0.1:8000/examen/agregar_producto/";  
    console.log("Enviando datos a:", url);
    console.log("Datos enviados:", { name, precio, localidad_id: localidadId });

    try {
        const response = await fetch(url, {
            method: "POST", 
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, precio, localidad_id: localidadId })
        });

        console.log("Código de respuesta:", response.status);

        if (!response.ok) {
            const errorText = await response.text();
            console.error("Error en la respuesta:", errorText);
            throw new Error(`Error del servidor: ${response.status} - ${errorText}`);
        }

        const data = await response.json();
        console.log("Datos recibidos:", data);

        alert("Producto agregado con éxito");
        location.reload();
    } catch (error) {
        alert("Hubo un problema al enviar la solicitud.");
        console.error("Error en fetch:", error);
    }
}


async function eliminarProducto(productoId) {
    const url = `http://127.0.0.1:8000/examen/eliminar_producto/${productoId}/`;
    console.log("Enviando solicitud de eliminación a:", url);

    try {
        const response = await fetch(url, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" }
        });

        const data = await response.json();
        console.log("Respuesta del servidor:", data);

        if (response.ok) {
            alert("Producto eliminado con éxito");
            document.getElementById(`producto-${productoId}`).remove();
        } else {
            alert("Error: " + data.error);
        }
    } catch (error) {
        alert("Hubo un problema al eliminar el producto.");
        console.error("Error en fetch:", error);
    }
}


async function verProducto(productoId) {
    const response = await fetch(`/ver_producto/${productoId}/`, {
        method: "GET"
    });

    const data = await response.json();
    if (response.ok) {
        console.log("Producto:", data);
        alert(`Producto: ${data.name}\nPrecio: ${data.precio}\nLocalidad: ${data.localidad}\nFecha de Creación: ${data.fecha_creacion}`);
    } else {
        alert("Error: " + data.error);
    }
}

