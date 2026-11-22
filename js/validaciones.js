//validación del formilario 
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

//menu hamburguesa
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

//validación de login


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

// validación de registro
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
/* validacion de catalogo-busqueda y filtro - punto 7 */
const tarjetas = document.querySelectorAll(".planta-card");

if (tarjetas.length > 0) {

    /*constantes para los elementos del DOM*/
    const buscador = document.querySelector("#buscar-planta");
    const filtroCategoria = document.querySelector("#filtrar-categoria");
    const botonLimpiar = document.querySelector("#limpiar-filtros");
    const contadorResultados = document.querySelector("#contador-resultados");
    const mensajeSinResultados = document.querySelector("#sin-resultados");
    const ordenarSelect = document.querySelector("#ordenar-planta");
    /*funciones*/
    function filtrarPlantas() {

        const textoBusqueda = buscador.value.toLowerCase().trim();
        const categoriaSeleccionada = filtroCategoria.value;

        let cantidadVisible = 0;

        tarjetas.forEach(function (tarjeta) {

            const nombre = tarjeta.querySelector(".nombre-planta").textContent.toLowerCase();
            const categoria = tarjeta.querySelector(".categoria").textContent;

            const coincideNombre = nombre.includes(textoBusqueda);
            const coincideCategoria = categoriaSeleccionada === "" || categoria === categoriaSeleccionada;

            if (coincideNombre && coincideCategoria) {
                tarjeta.style.display = "";
                cantidadVisible++;
            } else {
                tarjeta.style.display = "none";
            }

        });

        const hayFiltrosActivos = textoBusqueda !== "" || categoriaSeleccionada !== "";

        contadorResultados.hidden = !hayFiltrosActivos;
        mensajeSinResultados.hidden = !hayFiltrosActivos || cantidadVisible > 0;

        if (hayFiltrosActivos) {
            contadorResultados.textContent = "Plantas encontradas: " + cantidadVisible;
        }

    }
    function ordenarPlantas() {

        let tarjetasOrdenadas = Array.from(tarjetas);

        if (ordenarSelect.value === "nombre") {

            tarjetasOrdenadas.sort(function (a, b) {

                const nombreA = a.querySelector(".nombre-planta").textContent;
                const nombreB = b.querySelector(".nombre-planta").textContent;

                return nombreA.localeCompare(nombreB, "es");

            });

        } else if (ordenarSelect.value === "precio") {

            tarjetasOrdenadas.sort(function (a, b) {

                const precioA = parseFloat(
                    a.querySelector(".precio").textContent
                        .replace("Precio:", "")
                        .replace("€", "")
                        .trim()
                        .replace(",", ".")
                );

                const precioB = parseFloat(
                    b.querySelector(".precio").textContent
                        .replace("Precio:", "")
                        .replace("€", "")
                        .trim()
                        .replace(",", ".")
                );

                return precioA - precioB;

            });

        }

        // Si elegimos el orden original, recuperamos la posición inicial
        if (ordenarSelect.value === "original") {
            tarjetasOrdenadas = Array.from(tarjetas);
        }

        tarjetasOrdenadas.forEach(function (tarjeta) {
            tarjeta.parentElement.appendChild(tarjeta);
        });

        filtrarPlantas();

    }
    /*Eventos*/
    buscador.addEventListener("input", filtrarPlantas);
    filtroCategoria.addEventListener("change", filtrarPlantas);
    ordenarSelect.addEventListener("change", ordenarPlantas);

    botonLimpiar.addEventListener("click", function () {

        buscador.value = "";
        filtroCategoria.value = "";
        ordenarSelect.value = "original";

        ordenarPlantas();

    });

    // Mostrar el total inicial de plantas
    filtrarPlantas();

}
