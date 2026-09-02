/* ================================================= */
/* GAMERZONE - JAVASCRIPT */
/* ================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* ================================================= */
    /* OBTENER FORMULARIO */
    /* ================================================= */

    const formulario = document.getElementById("formularioContacto");

    /*
        Como script.js también está conectado a
        index.html, productos.html y nosotros.html,
        comprobamos primero que el formulario exista.
    */

    if (!formulario) {
        return;
    }


    /* ================================================= */
    /* CAMPOS DEL FORMULARIO */
    /* ================================================= */

    const nombre = document.getElementById("nombre");
    const correo = document.getElementById("correo");
    const telefono = document.getElementById("telefono");
    const motivo = document.getElementById("motivo");
    const mensaje = document.getElementById("mensaje");
    const terminos = document.getElementById("terminos");


    /* ================================================= */
    /* MENSAJES DE ERROR */
    /* ================================================= */

    const errorNombre = document.getElementById("errorNombre");
    const errorCorreo = document.getElementById("errorCorreo");
    const errorTelefono = document.getElementById("errorTelefono");
    const errorMotivo = document.getElementById("errorMotivo");
    const errorMensaje = document.getElementById("errorMensaje");
    const errorTerminos = document.getElementById("errorTerminos");


    /* ================================================= */
    /* OTROS ELEMENTOS */
    /* ================================================= */

    const contadorCaracteres =
        document.getElementById("contadorCaracteres");

    const mensajeExito =
        document.getElementById("mensajeExito");


    /* ================================================= */
    /* FUNCIONES GENERALES */
    /* ================================================= */


    /*
        Mostrar un error debajo del campo.
    */

    function mostrarError(campo, elementoError, texto) {

        campo.classList.add("campo-error");

        campo.classList.remove("campo-correcto");

        elementoError.textContent = texto;

    }


    /*
        Marcar un campo como correcto.
    */

    function mostrarCorrecto(campo, elementoError) {

        campo.classList.remove("campo-error");

        campo.classList.add("campo-correcto");

        elementoError.textContent = "";

    }


    /*
        Limpiar la apariencia de un campo.
    */

    function limpiarEstado(campo, elementoError) {

        campo.classList.remove("campo-error");

        campo.classList.remove("campo-correcto");

        elementoError.textContent = "";

    }


    /* ================================================= */
    /* VALIDAR NOMBRE */
    /* ================================================= */

    function validarNombre() {

        const valor = nombre.value.trim();


        /*
            Permite letras, espacios y caracteres
            habituales en nombres en español.
        */

        const patronNombre =
            /^[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s]+$/;


        if (valor === "") {

            mostrarError(
                nombre,
                errorNombre,
                "Ingresa tu nombre completo."
            );

            return false;
        }


        if (valor.length < 3) {

            mostrarError(
                nombre,
                errorNombre,
                "El nombre debe tener al menos 3 caracteres."
            );

            return false;
        }


        if (!patronNombre.test(valor)) {

            mostrarError(
                nombre,
                errorNombre,
                "El nombre solo puede contener letras y espacios."
            );

            return false;
        }


        mostrarCorrecto(
            nombre,
            errorNombre
        );

        return true;
    }


    /* ================================================= */
    /* VALIDAR CORREO */
    /* ================================================= */

    function validarCorreo() {

        const valor = correo.value.trim();


        /*
            Expresión regular sencilla
            para comprobar un correo válido.
        */

        const patronCorreo =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        if (valor === "") {

            mostrarError(
                correo,
                errorCorreo,
                "Ingresa tu correo electrónico."
            );

            return false;
        }


        if (!patronCorreo.test(valor)) {

            mostrarError(
                correo,
                errorCorreo,
                "Ingresa un correo válido. Ejemplo: nombre@correo.cl"
            );

            return false;
        }


        mostrarCorrecto(
            correo,
            errorCorreo
        );

        return true;
    }


    /* ================================================= */
    /* VALIDAR TELÉFONO */
    /* ================================================= */

    function validarTelefono() {

        const valor = telefono.value.trim();


        /*
            Para este proyecto utilizaremos
            un teléfono chileno de 9 dígitos.
            Ejemplo: 912345678
        */

        const patronTelefono =
            /^[0-9]{9}$/;


        if (valor === "") {

            mostrarError(
                telefono,
                errorTelefono,
                "Ingresa tu número de teléfono."
            );

            return false;
        }


        if (!patronTelefono.test(valor)) {

            mostrarError(
                telefono,
                errorTelefono,
                "El teléfono debe contener exactamente 9 números."
            );

            return false;
        }


        mostrarCorrecto(
            telefono,
            errorTelefono
        );

        return true;
    }


    /* ================================================= */
    /* VALIDAR MOTIVO */
    /* ================================================= */

    function validarMotivo() {

        if (motivo.value === "") {

            mostrarError(
                motivo,
                errorMotivo,
                "Selecciona un motivo de contacto."
            );

            return false;
        }


        mostrarCorrecto(
            motivo,
            errorMotivo
        );

        return true;
    }


    /* ================================================= */
    /* VALIDAR MENSAJE */
    /* ================================================= */

    function validarMensaje() {

        const valor = mensaje.value.trim();


        if (valor === "") {

            mostrarError(
                mensaje,
                errorMensaje,
                "Escribe un mensaje antes de enviar tu consulta."
            );

            return false;
        }


        if (valor.length < 10) {

            mostrarError(
                mensaje,
                errorMensaje,
                "El mensaje debe tener al menos 10 caracteres."
            );

            return false;
        }


        if (valor.length > 500) {

            mostrarError(
                mensaje,
                errorMensaje,
                "El mensaje no puede superar los 500 caracteres."
            );

            return false;
        }


        mostrarCorrecto(
            mensaje,
            errorMensaje
        );

        return true;
    }


    /* ================================================= */
    /* VALIDAR TÉRMINOS */
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
    /* CONTADOR DE CARACTERES */
    /* ================================================= */

    mensaje.addEventListener("input", function () {

        const cantidad =
            mensaje.value.length;


        contadorCaracteres.textContent =
            cantidad;


        /*
            Evitamos que el usuario escriba
            más de 500 caracteres.
        */

        if (cantidad > 500) {

            mensaje.value =
                mensaje.value.substring(0, 500);

            contadorCaracteres.textContent =
                500;
        }


        /*
            Mientras escribe también
            actualizamos la validación.
        */

        if (mensaje.value.trim() !== "") {

            validarMensaje();
        }

    });


    /* ================================================= */
    /* EVITAR LETRAS EN TELÉFONO */
    /* ================================================= */

    telefono.addEventListener("input", function () {

        /*
            Elimina automáticamente
            cualquier carácter que no sea número.
        */

        telefono.value =
            telefono.value.replace(/\D/g, "");


        /*
            Limita el teléfono a 9 dígitos.
        */

        if (telefono.value.length > 9) {

            telefono.value =
                telefono.value.substring(0, 9);
        }

    });


    /* ================================================= */
    /* VALIDACIONES EN TIEMPO REAL */
    /* ================================================= */


    /*
        Cuando el usuario sale del campo
        comprobamos si está correcto.
    */

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
    /* ELIMINAR ERROR MIENTRAS EL USUARIO CORRIGE */
    /* ================================================= */

    nombre.addEventListener("input", function () {

        if (nombre.value.trim().length >= 3) {

            validarNombre();
        }

    });


    correo.addEventListener("input", function () {

        if (correo.value.trim() !== "") {

            validarCorreo();
        }

    });


    telefono.addEventListener("input", function () {

        if (telefono.value.length === 9) {

            validarTelefono();
        }

    });


    /* ================================================= */
    /* ENVÍO DEL FORMULARIO */
    /* ================================================= */

    formulario.addEventListener("submit", function (evento) {

        /*
            Evitamos que el navegador
            envíe el formulario automáticamente.
        */

        evento.preventDefault();


        /*
            Ocultamos cualquier mensaje de éxito
            anterior.
        */

        mensajeExito.classList.remove("activo");

        mensajeExito.textContent = "";


        /*
            Ejecutamos todas las validaciones.
        */

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


        /* ================================================= */
        /* SI EXISTE ALGÚN ERROR */
        /* ================================================= */

        if (
            !nombreValido ||
            !correoValido ||
            !telefonoValido ||
            !motivoValido ||
            !mensajeValido ||
            !terminosValidos
        ) {

            /*
                Buscamos el primer campo incorrecto
                y llevamos al usuario hasta él.
            */

            const primerCampoError =
                formulario.querySelector(
                    ".campo-error"
                );


            if (primerCampoError) {

                primerCampoError.focus();

            }


            return;
        }


        /* ================================================= */
        /* FORMULARIO CORRECTO */
        /* ================================================= */

        mensajeExito.textContent =
            "Mensaje enviado correctamente. Gracias por contactar a GamerZone. Revisaremos tu consulta a la brevedad.";

        mensajeExito.classList.add(
            "activo"
        );


        /* ================================================= */
        /* LIMPIAR FORMULARIO */
        /* ================================================= */

        formulario.reset();


        contadorCaracteres.textContent =
            "0";


        limpiarEstado(
            nombre,
            errorNombre
        );


        limpiarEstado(
            correo,
            errorCorreo
        );


        limpiarEstado(
            telefono,
            errorTelefono
        );


        limpiarEstado(
            motivo,
            errorMotivo
        );


        limpiarEstado(
            mensaje,
            errorMensaje
        );


        errorTerminos.textContent = "";


        /* ================================================= */
        /* MOSTRAR MENSAJE DE ÉXITO */
        /* ================================================= */

        mensajeExito.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

    });

});