/*validación del formulario */
const formularioContacto = document.getElementById("form-contacto");
if (formularioContacto) {
    formularioContacto.addEventListener("submit", function (event) {
        event.preventDefault();

        const nombre = document.getElementById("nombre").value.trim();

        const email = document.getElementById("email").value.trim();

        const mensaje = document.getElementById("mensaje").value.trim();

        const motivo = document.getElementById("motivo").value;

        let errores = [];

        if (nombre === "") {
            errores.push("El nombre es obligatorio.");
        }

        if (email === "") {
            errores.push("El email es obligatorio.");
        }
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            errores.push("El formato del email no es válido.");
        }
        if (mensaje === "") {
            errores.push("El mensaje es obligatorio.");
        }
        if (motivo === "") {
            errores.push("Debés seleccionar un motivo de contacto.");
        }

        const mensajeError = document.getElementById("mensaje-error");
        const mensajeExito = document.getElementById("mensaje-exito");

        if (errores.length > 0) {
            mensajeError.textContent = errores.join(" ");
            mensajeError.hidden = false;
            mensajeExito.hidden = true;

        } else {
            mensajeError.hidden = true;
            mensajeExito.textContent = "¡Formulario validado correctamente!";
            mensajeExito.hidden = false;
        }

    });
    formularioContacto.addEventListener("reset", function () {

        const mensajeError = document.getElementById("mensaje-error");
        const mensajeExito = document.getElementById("mensaje-exito");

        mensajeError.hidden = true;
        mensajeExito.hidden = true;

        mensajeError.textContent = "";
        mensajeExito.textContent = "";

    });
}

/*menu hamburguesa*/
const botonMenu = document.getElementById("menu-toggle");
const menu = document.getElementById("menu-principal");
if (botonMenu && menu) {
    botonMenu.addEventListener("click", function () {

        menu.classList.toggle("menu-visible");
        const estaAbierto = menu.classList.contains("menu-visible");

        botonMenu.setAttribute("aria-expanded", estaAbierto);
        botonMenu.setAttribute(
            "aria-label",
            estaAbierto ? "Cerrar menú" : "Abrir menú"
        );
    });
}

/*validación de login*/

const formularioLogin = document.getElementById("form-login");

if (formularioLogin) {
    formularioLogin.addEventListener("submit", function (event) {
        event.preventDefault();

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;

        let errores = [];

        if (email === "") {
            errores.push("El email es obligatorio.");
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            errores.push("El formato del email no es válido.");
        }

        if (password === "") {
            errores.push("La contraseña es obligatoria.");
        }

        const mensajeError = document.getElementById("mensaje-error");
        const mensajeExito = document.getElementById("mensaje-exito");

        if (errores.length > 0) {
            mensajeError.textContent = errores.join(" ");
            mensajeError.hidden = false;
            mensajeExito.hidden = true;

        } else {
            mensajeError.hidden = true;
            mensajeExito.textContent = "¡Formulario validado correctamente!";
            mensajeExito.hidden = false;
        }

    });

}

/* validación de registro */
const formularioRegistro = document.getElementById("form-registro");

if (formularioRegistro) {
    formularioRegistro.addEventListener("submit", function (event) {
        event.preventDefault();

        const nombre = document.getElementById("nombre").value.trim();
        const apellidos = document.getElementById("apellidos").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;
        const repetirPassword = document.getElementById("repetir-password").value;
        const terminos = document.getElementById("terminos").checked;

        let errores = [];

        if (nombre === "") {
            errores.push("El nombre es obligatorio.");
        }

        if (apellidos === "") {
            errores.push("Los apellidos son obligatorios.");
        }

        if (email === "") {
            errores.push("El email es obligatorio.");
        }
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            errores.push("El formato del email no es válido.");
        }
        if (password === "") {
            errores.push("La contraseña es obligatoria.");
        }
        if (repetirPassword === "") {
            errores.push("Debés repetir la contraseña.");
        }
        else if (password !== repetirPassword) {
            errores.push("Las contraseñas no coinciden.");
        }
        if (!terminos) {
            errores.push("Debés aceptar los términos y condiciones.");
        }

        const mensajeError = document.getElementById("mensaje-error");
        const mensajeExito = document.getElementById("mensaje-exito");

        if (errores.length > 0) {
            mensajeError.textContent = errores.join(" ");
            mensajeError.hidden = false;
            mensajeExito.hidden = true;
        } else {
            mensajeError.hidden = true;
            mensajeExito.textContent = "¡Registro validado correctamente!";
            mensajeExito.hidden = false;
        }
    });

    formularioRegistro.addEventListener("reset", function () {
        const mensajeError = document.getElementById("mensaje-error");
        const mensajeExito = document.getElementById("mensaje-exito");

        mensajeError.hidden = true;
        mensajeExito.hidden = true;

        mensajeError.textContent = "";
        mensajeExito.textContent = "";
    });
}
/*Generación dinámica del catalogo- funciones*/

function crearTarjeta(planta) {

    const tarjeta = document.createElement("article");
    tarjeta.classList.add("planta-card");

    tarjeta.innerHTML = `
        <img src="${planta.foto}" alt="${planta.nombre}">

        <h3 class="nombre-planta">${planta.nombre}</h3>

        <p class="categoria">${planta.categoria}</p>

        <p>${planta.notas}</p>

        <p class="precio">Precio: ${planta.precio.toFixed(2).replace(".", ",")} €</p>

        <a href="planta.html" class="catalogo">Ver producto</a>
    `;

    return tarjeta;
}

function generarCatalogo(listaPlantas = plantas) {

    const contenedor = document.getElementById("catalogo-grid");

    if (!contenedor || typeof plantas === "undefined") {
        return;
    }

    contenedor.innerHTML = "";

    listaPlantas.forEach(function (planta) {

        const tarjeta = crearTarjeta(planta);

        contenedor.appendChild(tarjeta);

    });

}

generarCatalogo();


/* modifica 7-  Búsqueda, filtros y ordenamiento desde el array*/

const contenedorCatalogo = document.getElementById("catalogo-grid");

if (contenedorCatalogo && typeof plantas !== "undefined") {

    const buscador = document.getElementById("buscar-planta");
    const filtroCategoria = document.getElementById("filtrar-categoria");
    const botonLimpiar = document.getElementById("limpiar-filtros");
    const contadorResultados = document.getElementById("contador-resultados");
    const mensajeSinResultados = document.getElementById("sin-resultados");
    const ordenarSelect = document.getElementById("ordenar-planta");

    function filtrarYOrdenarPlantas() {

        const textoBusqueda = buscador.value.toLowerCase().trim();
        const categoriaSeleccionada = filtroCategoria.value.toLowerCase();

        let plantasFiltradas = plantas.filter(function (planta) {

            const coincideNombre = planta.nombre.toLowerCase().includes(textoBusqueda);

            const coincideCategoria =
                categoriaSeleccionada === "" ||
                planta.categoria.toLowerCase() === categoriaSeleccionada;

            return coincideNombre && coincideCategoria;

        });

        if (ordenarSelect.value === "nombre") {

            plantasFiltradas.sort(function (a, b) {
                return a.nombre.localeCompare(b.nombre, "es");
            });

        } else if (ordenarSelect.value === "precio") {

            plantasFiltradas.sort(function (a, b) {
                return a.precio - b.precio;
            });

        }

        generarCatalogo(plantasFiltradas);

        const hayFiltrosActivos =
            textoBusqueda !== "" || categoriaSeleccionada !== "";

        contadorResultados.hidden = !hayFiltrosActivos;

        mensajeSinResultados.hidden =
            !hayFiltrosActivos || plantasFiltradas.length > 0;

        if (hayFiltrosActivos) {
            contadorResultados.textContent =
                "Plantas encontradas: " + plantasFiltradas.length;
        }

    }

    /*eventos*/
    buscador.addEventListener("input", filtrarYOrdenarPlantas);

    filtroCategoria.addEventListener("change", filtrarYOrdenarPlantas);

    ordenarSelect.addEventListener("change", filtrarYOrdenarPlantas);

    botonLimpiar.addEventListener("click", function () {

        buscador.value = "";
        filtroCategoria.value = "";
        ordenarSelect.value = "original";

        filtrarYOrdenarPlantas();

    });


    /*Mostrar todas las plantas*/
    filtrarYOrdenarPlantas();

}