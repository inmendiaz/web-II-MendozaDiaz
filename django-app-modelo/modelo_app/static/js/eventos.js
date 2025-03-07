async function agregarEvento() {
    const name = document.getElementById("nombreEvento").value;
    const fechaInicio = document.getElementById("fechaInicio").value;
    const fechaFin = document.getElementById("fechaFin").value;
    const localidadId = document.getElementById("localidadId").value;

    if (!name || !fechaInicio || !fechaFin || !localidadId) {
        alert("Todos los campos son obligatorios.");
        return;
    }

    const url = "http://127.0.0.1:8000/examen/agregar_evento/";
    console.log("Enviando datos a:", url);
    console.log("Datos enviados:", { name, fecha_inicio: fechaInicio, fecha_fin: fechaFin, localidad_id: localidadId });

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, fecha_inicio: fechaInicio, fecha_fin: fechaFin, localidad_id: localidadId })
        });

        const data = await response.json();
        console.log("Respuesta del servidor:", data);

        if (response.ok) {
            alert("Evento agregado con éxito");
            location.reload();
        } else {
            alert("Error: " + data.error);
        }
    } catch (error) {
        alert("Hubo un problema al enviar la solicitud.");
        console.error("Error en fetch:", error);
    }
}

async function eliminarEvento(eventoId) {
    const url = `http://127.0.0.1:8000/examen/eliminar_evento/${eventoId}/`;
    console.log("Enviando solicitud de eliminación a:", url);

    try {
        const response = await fetch(url, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" }
        });

        const data = await response.json();
        console.log("Respuesta del servidor:", data);

        if (response.ok) {
            alert("Evento eliminado con éxito");
            document.getElementById(`evento-${eventoId}`).remove();
        } else {
            alert("Error: " + data.error);
        }
    } catch (error) {
        alert("Hubo un problema al eliminar el evento.");
        console.error("Error en fetch:", error);
    }
}