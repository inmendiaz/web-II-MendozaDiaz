async function agregarProducto() {
    const name = document.getElementById("nombreProducto").value;
    const precio = parseFloat(document.getElementById("precioProducto").value);
    const localidadId = document.getElementById("localidadId").value;

    const response = await fetch("/agregar_producto/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, precio, localidad_id: localidadId })
    });

    const data = await response.json();
    if (response.ok) {
        alert(data.message);
    } else {
        alert("Error: " + data.error);
    }
}

async function eliminarProducto(productoId) {
    const response = await fetch(`/eliminar_producto/${productoId}/`, {
        method: "DELETE"
    });

    const data = await response.json();
    if (response.ok) {
        alert(data.message);
        document.getElementById(`producto-${productoId}`).remove();
    } else {
        alert("Error: " + data.error);
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

