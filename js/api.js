
/* para consultar las plantas a la API */

const URL_API = "https://6ae0a63fbe3bc8fead97a7c0.mockapi.io/api/plantas";
let plantasAPI = [];
async function obtenerPlantas() {

    const respuesta = await fetch(URL_API);

    if (!respuesta.ok) {
        throw new Error("No se pudieron obtener las plantas.");
    }

    const plantas = await respuesta.json();

    return plantas.filter(function (planta) {
        return !planta.nombre.startsWith("PRUEBA");
    });
}
