document.addEventListener("DOMContentLoaded", function () {

    iniciarCatalogoProductos();
    iniciarFormularioContacto();

});


/* ================================================= */
/* CATÁLOGO DE PRODUCTOS */
/* ================================================= */

function iniciarCatalogoProductos() {

    const formularioBusqueda =
        document.getElementById("formularioBusqueda");

    const buscador =
        document.getElementById("buscadorProducto");

    const botonLimpiar =
        document.getElementById("botonLimpiarBusqueda");

    const botonRestablecer =
        document.getElementById("botonRestablecer");

    const resultadoBusqueda =
        document.getElementById("resultadoBusqueda");

    const sinResultados =
        document.getElementById("sinResultados");

    const productos =
        document.querySelectorAll(
            "#listaProductos .catalogo-producto"
        );

    const botonesFiltro =
        document.querySelectorAll(
            ".filtro-producto"
        );


    if (
        !formularioBusqueda ||
        !buscador ||
        productos.length === 0
    ) {

        return;

    }


    let filtroActual = "todos";


    /* ================================================= */
    /* NORMALIZAR TEXTO */
    /* ================================================= */

    function normalizarTexto(texto) {

        return texto
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .trim();

    }


    /* ================================================= */
    /* NOMBRE VISIBLE DE CATEGORÍA */
    /* ================================================= */

    function nombreCategoria(categoria) {

        const categorias = {

            "todos": "Todos",

            "perifericos": "Periféricos",

            "monitores": "Monitores",

            "componentes": "Componentes",

            "pc-gamer": "PC Gamer",

            "accesorios": "Accesorios"

        };


        return categorias[categoria] || categoria;

    }


    /* ================================================= */
    /* APLICAR BÚSQUEDA + FILTRO */
    /* ================================================= */

    function aplicarFiltros() {

        const textoOriginal =
            buscador.value.trim();

        const termino =
            normalizarTexto(textoOriginal);

        let cantidadVisible = 0;


        productos.forEach(function (producto) {

            const nombre =
                normalizarTexto(
                    producto.dataset.nombre || ""
                );

            const categoria =
                producto.dataset.categoria || "";

            const titulo =
                normalizarTexto(
                    producto.querySelector("h3")
                        ?.textContent || ""
                );


            const coincideBusqueda =
                termino === "" ||
                nombre.includes(termino) ||
                titulo.includes(termino);


            const coincideCategoria =
                filtroActual === "todos" ||
                categoria === filtroActual;


            const mostrar =
                coincideBusqueda &&
                coincideCategoria;


            producto.hidden = !mostrar;


            if (mostrar) {

                cantidadVisible++;

            }

        });


        actualizarResultado(
            cantidadVisible,
            textoOriginal
        );

    }


    /* ================================================= */
    /* ACTUALIZAR TEXTO DE RESULTADOS */
    /* ================================================= */

    function actualizarResultado(
        cantidadVisible,
        textoOriginal
    ) {

        const categoriaTexto =
            nombreCategoria(filtroActual);


        if (
            textoOriginal === "" &&
            filtroActual === "todos"
        ) {

            resultadoBusqueda.textContent =
                `Mostrando los ${productos.length} productos`;

        }


        else if (
            textoOriginal === "" &&
            filtroActual !== "todos"
        ) {

            resultadoBusqueda.textContent =
                `Mostrando ${cantidadVisible} producto${cantidadVisible !== 1 ? "s" : ""} en ${categoriaTexto}`;

        }


        else if (
            textoOriginal !== "" &&
            filtroActual === "todos"
        ) {

            if (cantidadVisible === 0) {

                resultadoBusqueda.textContent =
                    `No encontramos resultados para "${textoOriginal}"`;

            }

            else {

                resultadoBusqueda.textContent =
                    `${cantidadVisible} producto${cantidadVisible !== 1 ? "s" : ""} encontrado${cantidadVisible !== 1 ? "s" : ""} para "${textoOriginal}"`;

            }

        }


        else {

            if (cantidadVisible === 0) {

                resultadoBusqueda.textContent =
                    `No hay resultados para "${textoOriginal}" en ${categoriaTexto}`;

            }

            else {

                resultadoBusqueda.textContent =
                    `${cantidadVisible} producto${cantidadVisible !== 1 ? "s" : ""} encontrado${cantidadVisible !== 1 ? "s" : ""} para "${textoOriginal}" en ${categoriaTexto}`;

            }

        }


        if (sinResultados) {

            sinResultados.hidden =
                cantidadVisible !== 0;

        }

    }


    /* ================================================= */
    /* BOTONES ACTIVOS */
    /* ================================================= */

    function actualizarBotonActivo(
        botonSeleccionado
    ) {

        botonesFiltro.forEach(
            function (boton) {

                boton.classList.remove(
                    "activo"
                );

                boton.setAttribute(
                    "aria-pressed",
                    "false"
                );

            }
        );


        botonSeleccionado.classList.add(
            "activo"
        );


        botonSeleccionado.setAttribute(
            "aria-pressed",
            "true"
        );

    }


    /* ================================================= */
    /* FORMULARIO DE BÚSQUEDA */
    /* ================================================= */

    formularioBusqueda.addEventListener(
        "submit",
        function (evento) {

            evento.preventDefault();

            aplicarFiltros();

            document
                .getElementById("listaProductos")
                .scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

        }
    );


    /* ================================================= */
    /* FILTROS POR CATEGORÍA */
    /* ================================================= */

    botonesFiltro.forEach(
        function (boton) {

            boton.addEventListener(
                "click",
                function () {

                    filtroActual =
                        boton.dataset.filtro;

                    actualizarBotonActivo(
                        boton
                    );

                    aplicarFiltros();

                    document
                        .getElementById("listaProductos")
                        .scrollIntoView({
                            behavior: "smooth",
                            block: "start"
                        });

                }
            );

        }
    );


    /* ================================================= */
    /* LIMPIAR TODO */
    /* ================================================= */

    function restablecerCatalogo() {

        buscador.value = "";

        filtroActual = "todos";


        const botonTodos =
            document.querySelector(
                '.filtro-producto[data-filtro="todos"]'
            );


        if (botonTodos) {

            actualizarBotonActivo(
                botonTodos
            );

        }


        aplicarFiltros();

    }


    if (botonLimpiar) {

        botonLimpiar.addEventListener(
            "click",
            function () {

                restablecerCatalogo();

                buscador.focus();

            }
        );

    }


    if (botonRestablecer) {

        botonRestablecer.addEventListener(
            "click",
            function () {

                restablecerCatalogo();

                document
                    .querySelector(".zona-catalogo-control")
                    .scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

            }
        );

    }


    /* ================================================= */
    /* ESTADO INICIAL */
    /* ================================================= */

    const botonTodos =
        document.querySelector(
            '.filtro-producto[data-filtro="todos"]'
        );


    if (botonTodos) {

        botonTodos.setAttribute(
            "aria-pressed",
            "true"
        );

    }


    aplicarFiltros();

}


/* ================================================= */
/* FORMULARIO DE CONTACTO */
/* ================================================= */

function iniciarFormularioContacto() {

    const formulario =
        document.getElementById(
            "formularioContacto"
        );


    if (!formulario) {

        return;

    }


    const nombre =
        document.getElementById("nombre");

    const correo =
        document.getElementById("correo");

    const telefono =
        document.getElementById("telefono");

    const motivo =
        document.getElementById("motivo");

    const mensaje =
        document.getElementById("mensaje");

    const terminos =
        document.getElementById("terminos");


    const errorNombre =
        document.getElementById("errorNombre");

    const errorCorreo =
        document.getElementById("errorCorreo");

    const errorTelefono =
        document.getElementById("errorTelefono");

    const errorMotivo =
        document.getElementById("errorMotivo");

    const errorMensaje =
        document.getElementById("errorMensaje");

    const errorTerminos =
        document.getElementById("errorTerminos");


    const contadorCaracteres =
        document.getElementById(
            "contadorCaracteres"
        );

    const mensajeExito =
        document.getElementById(
            "mensajeExito"
        );


    /* ================================================= */
    /* FUNCIONES VISUALES */
    /* ================================================= */

    function mostrarError(
        campo,
        elementoError,
        mensajeError
    ) {

        campo.classList.remove(
            "campo-correcto"
        );

        campo.classList.add(
            "campo-error"
        );

        elementoError.textContent =
            mensajeError;

        return false;

    }


    function mostrarCorrecto(
        campo,
        elementoError
    ) {

        campo.classList.remove(
            "campo-error"
        );

        campo.classList.add(
            "campo-correcto"
        );

        elementoError.textContent = "";

        return true;

    }


    function limpiarEstado(campo) {

        campo.classList.remove(
            "campo-error",
            "campo-correcto"
        );

    }


    /* ================================================= */
    /* VALIDAR NOMBRE */
    /* ================================================= */

    function validarNombre() {

        const valor =
            nombre.value.trim();

        const expresionNombre =
            /^[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s]+$/;


        if (valor === "") {

            return mostrarError(
                nombre,
                errorNombre,
                "Ingresa tu nombre para continuar."
            );

        }


        if (valor.length < 3) {

            return mostrarError(
                nombre,
                errorNombre,
                "El nombre debe tener al menos 3 caracteres."
            );

        }


        if (!expresionNombre.test(valor)) {

            return mostrarError(
                nombre,
                errorNombre,
                "Utiliza solamente letras y espacios."
            );

        }


        return mostrarCorrecto(
            nombre,
            errorNombre
        );

    }


    /* ================================================= */
    /* VALIDAR CORREO */
    /* ================================================= */

    function validarCorreo() {

        const valor =
            correo.value.trim();

        const expresionCorreo =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        if (valor === "") {

            return mostrarError(
                correo,
                errorCorreo,
                "Ingresa tu correo electrónico."
            );

        }


        if (!expresionCorreo.test(valor)) {

            return mostrarError(
                correo,
                errorCorreo,
                "Ingresa un correo válido, por ejemplo nombre@correo.cl."
            );

        }


        return mostrarCorrecto(
            correo,
            errorCorreo
        );

    }


    /* ================================================= */
    /* VALIDAR TELÉFONO */
    /* ================================================= */

    function validarTelefono() {

        const valor =
            telefono.value.trim();

        const expresionTelefono =
            /^[0-9]{9}$/;


        if (valor === "") {

            return mostrarError(
                telefono,
                errorTelefono,
                "Ingresa tu número de teléfono."
            );

        }


        if (!expresionTelefono.test(valor)) {

            return mostrarError(
                telefono,
                errorTelefono,
                "El teléfono debe contener exactamente 9 números. Ej: 912345678."
            );

        }


        return mostrarCorrecto(
            telefono,
            errorTelefono
        );

    }


    /* ================================================= */
    /* VALIDAR MOTIVO */
    /* ================================================= */

    function validarMotivo() {

        if (motivo.value === "") {

            return mostrarError(
                motivo,
                errorMotivo,
                "Selecciona el motivo de tu consulta."
            );

        }


        return mostrarCorrecto(
            motivo,
            errorMotivo
        );

    }


    /* ================================================= */
    /* VALIDAR MENSAJE */
    /* ================================================= */

    function validarMensaje() {

        const valor =
            mensaje.value.trim();


        if (valor === "") {

            return mostrarError(
                mensaje,
                errorMensaje,
                "Escribe un mensaje para que podamos ayudarte."
            );

        }


        if (valor.length < 10) {

            return mostrarError(
                mensaje,
                errorMensaje,
                "Tu mensaje debe contener al menos 10 caracteres."
            );

        }


        if (valor.length > 500) {

            return mostrarError(
                mensaje,
                errorMensaje,
                "El mensaje no puede superar los 500 caracteres."
            );

        }


        return mostrarCorrecto(
            mensaje,
            errorMensaje
        );

    }


    /* ================================================= */
    /* VALIDAR CONFIRMACIÓN */
    /* ================================================= */

    function validarTerminos() {

        if (!terminos.checked) {

            errorTerminos.textContent =
                "Debes confirmar que los datos ingresados son correctos.";

            return false;

        }


        errorTerminos.textContent = "";

        return true;

    }


    /* ================================================= */
    /* CONTADOR */
    /* ================================================= */

    mensaje.addEventListener(
        "input",
        function () {

            if (
                mensaje.value.length > 500
            ) {

                mensaje.value =
                    mensaje.value.substring(
                        0,
                        500
                    );

            }


            contadorCaracteres.textContent =
                mensaje.value.length;


            if (
                mensaje.value.length > 0
            ) {

                validarMensaje();

            }

            else {

                limpiarEstado(
                    mensaje
                );

                errorMensaje.textContent = "";

            }

        }
    );


    /* ================================================= */
    /* TELÉFONO */
    /* ================================================= */

    telefono.addEventListener(
        "input",
        function () {

            telefono.value =
                telefono.value
                    .replace(/\D/g, "")
                    .substring(0, 9);

        }
    );


    /* ================================================= */
    /* VALIDACIÓN INDIVIDUAL */
    /* ================================================= */

    nombre.addEventListener(
        "blur",
        validarNombre
    );

    correo.addEventListener(
        "blur",
        validarCorreo
    );

    telefono.addEventListener(
        "blur",
        validarTelefono
    );

    motivo.addEventListener(
        "change",
        validarMotivo
    );

    mensaje.addEventListener(
        "blur",
        validarMensaje
    );

    terminos.addEventListener(
        "change",
        validarTerminos
    );


    /* ================================================= */
    /* ENVÍO DEL FORMULARIO */
    /* ================================================= */

    formulario.addEventListener(
        "submit",
        function (evento) {

            evento.preventDefault();


            mensajeExito.classList.remove(
                "activo"
            );


            const nombreValido =
                validarNombre();

            const correoValido =
                validarCorreo();

            const telefonoValido =
                validarTelefono();

            const motivoValido =
                validarMotivo();

            const mensajeValido =
                validarMensaje();

            const terminosValidos =
                validarTerminos();


            const formularioValido =
                nombreValido &&
                correoValido &&
                telefonoValido &&
                motivoValido &&
                mensajeValido &&
                terminosValidos;


            if (!formularioValido) {

                const primerCampoError =
                    formulario.querySelector(
                        ".campo-error"
                    );


                if (primerCampoError) {

                    primerCampoError.focus();

                }

                else if (
                    !terminos.checked
                ) {

                    terminos.focus();

                }


                return;

            }


            mensajeExito.textContent =
                "Mensaje enviado correctamente. Gracias por contactar a GamerZone. Revisaremos tu consulta a la brevedad.";


            mensajeExito.classList.add(
                "activo"
            );


            formulario.reset();


            contadorCaracteres.textContent =
                "0";


            [
                nombre,
                correo,
                telefono,
                motivo,
                mensaje
            ].forEach(
                function (campo) {

                    limpiarEstado(
                        campo
                    );

                }
            );


            [
                errorNombre,
                errorCorreo,
                errorTelefono,
                errorMotivo,
                errorMensaje,
                errorTerminos
            ].forEach(
                function (error) {

                    error.textContent = "";

                }
            );


            mensajeExito.scrollIntoView({

                behavior: "smooth",

                block: "center"

            });

        }
    );

}