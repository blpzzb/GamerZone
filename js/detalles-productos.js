document.addEventListener(
    "DOMContentLoaded",
    function () {

        iniciarDetallesProductos();

    }
);


/* ================================================= */
/* DETALLES DE PRODUCTOS */
/* ================================================= */

function iniciarDetallesProductos() {

    const modal =
        document.getElementById("modalProducto");

    const botonesDetalle =
        document.querySelectorAll(
            ".boton-ver-detalles"
        );


    if (
        !modal ||
        botonesDetalle.length === 0
    ) {

        return;

    }


    /* ================================================= */
    /* ELEMENTOS DEL MODAL */
    /* ================================================= */

    const imagen =
        document.getElementById(
            "modalProductoImagen"
        );

    const categoria =
        document.getElementById(
            "modalProductoCategoria"
        );

    const titulo =
        document.getElementById(
            "modalProductoTitulo"
        );

    const descripcion =
        document.getElementById(
            "modalProductoDescripcion"
        );

    const precio =
        document.getElementById(
            "modalProductoPrecio"
        );

    const listaCaracteristicas =
        document.getElementById(
            "modalProductoCaracteristicas"
        );

    const botonCerrar =
        document.getElementById(
            "cerrarModalProducto"
        );

    const botonesCerrar =
        modal.querySelectorAll(
            "[data-cerrar-modal]"
        );


    let elementoAnterior = null;


    /* ================================================= */
    /* INFORMACIÓN DE LOS PRODUCTOS */
    /* ================================================= */

    const productos = {

        teclado: {

            nombre:
                "Teclado Mecánico RGB",

            categoria:
                "PERIFÉRICOS / TECLADO",

            precio:
                "$59.990",

            imagen:
                "img/teclado.jpg",

            descripcion:
                "Teclado mecánico diseñado para jugadores que buscan precisión, respuesta rápida y una estética RGB para completar su setup.",

            caracteristicas: [

                "Interruptores mecánicos de respuesta rápida.",

                "Iluminación RGB orientada a setups gamer.",

                "Formato cómodo para sesiones prolongadas.",

                "Diseñado para gaming y uso cotidiano."

            ]

        },


        mouse: {

            nombre:
                "Mouse Gamer RGB",

            categoria:
                "PERIFÉRICOS / MOUSE",

            precio:
                "$29.990",

            imagen:
                "img/mouse.jpg",

            descripcion:
                "Mouse gamer con diseño ergonómico y enfoque en precisión para movimientos rápidos durante sesiones de juego.",

            caracteristicas: [

                "Diseño ergonómico para mayor comodidad.",

                "Respuesta precisa durante movimientos rápidos.",

                "Iluminación RGB integrada.",

                "Orientado a gaming y uso prolongado."

            ]

        },


        audifonos: {

            nombre:
                "Audífonos Gamer",

            categoria:
                "PERIFÉRICOS / AUDIO",

            precio:
                "$49.990",

            imagen:
                "img/audifonos.jpg",

            descripcion:
                "Audífonos orientados a gaming, comunicación y multimedia, combinando comodidad con una experiencia de audio envolvente.",

            caracteristicas: [

                "Diseño pensado para sesiones prolongadas.",

                "Audio orientado a gaming y multimedia.",

                "Adecuados para comunicación durante partidas.",

                "Estética gamer para complementar el setup."

            ]

        },


        monitor: {

            nombre:
                "Monitor Gamer 165 Hz",

            categoria:
                "MONITORES",

            precio:
                "$199.990",

            imagen:
                "img/monitor.jpg",

            descripcion:
                "Monitor gamer de alta frecuencia de actualización pensado para entregar mayor fluidez visual y respuesta durante las partidas.",

            caracteristicas: [

                "Frecuencia de actualización de 165 Hz.",

                "Mayor fluidez en escenas de movimiento.",

                "Diseñado para gaming competitivo y casual.",

                "Formato ideal para complementar un setup gamer."

            ]

        },


        silla: {

            nombre:
                "Silla Gamer Pro",

            categoria:
                "ACCESORIOS / ERGONOMÍA",

            precio:
                "$149.990",

            imagen:
                "img/silla.jpg",

            descripcion:
                "Silla gamer orientada a entregar soporte y comodidad durante largas sesiones frente al computador.",

            caracteristicas: [

                "Diseño ergonómico.",

                "Soporte pensado para sesiones prolongadas.",

                "Estética gamer moderna.",

                "Adecuada para gaming, estudio y trabajo."

            ]

        },


        control: {

            nombre:
                "Control Gamer Pro",

            categoria:
                "ACCESORIOS / CONTROL",

            precio:
                "$54.990",

            imagen:
                "img/control.jpg",

            descripcion:
                "Control gamer diseñado para entregar comodidad, precisión y una experiencia alternativa al teclado y mouse.",

            caracteristicas: [

                "Diseño cómodo y de fácil agarre.",

                "Controles orientados a movimientos precisos.",

                "Ideal para distintos géneros de videojuegos.",

                "Complemento para setups de PC gamer."

            ]

        },


        gpu: {

            nombre:
                "Tarjeta Gráfica Gamer",

            categoria:
                "COMPONENTES / GPU",

            precio:
                "$649.990",

            imagen:
                "img/gpu.jpg",

            descripcion:
                "Componente dedicado al procesamiento gráfico para mejorar rendimiento, calidad visual y fluidez en videojuegos.",

            caracteristicas: [

                "Procesamiento dedicado de gráficos.",

                "Mejora el rendimiento visual en videojuegos.",

                "Orientada a equipos gamer de alto rendimiento.",

                "Adecuada para gaming y tareas gráficas intensivas."

            ]

        },


        pc: {

            nombre:
                "PC Gamer RGB Pro",

            categoria:
                "PC GAMER",

            precio:
                "$1.199.990",

            imagen:
                "img/pc-gamer.jpg",

            descripcion:
                "Equipo gamer completo pensado para videojuegos, streaming y tareas de alto rendimiento con una estética RGB moderna.",

            caracteristicas: [

                "Configuración orientada a gaming.",

                "Preparado para streaming y uso intensivo.",

                "Diseño de torre con iluminación RGB.",

                "Equipo central para un setup de alto rendimiento."

            ]

        }

    };


    /* ================================================= */
    /* ABRIR MODAL */
    /* ================================================= */

    function abrirModal(idProducto) {

        const producto =
            productos[idProducto];


        if (!producto) {
            return;
        }


        elementoAnterior =
            document.activeElement;


        imagen.src =
            producto.imagen;

        imagen.alt =
            producto.nombre;


        categoria.textContent =
            producto.categoria;


        titulo.textContent =
            producto.nombre;


        descripcion.textContent =
            producto.descripcion;


        precio.textContent =
            producto.precio;


        listaCaracteristicas.innerHTML = "";


        producto.caracteristicas.forEach(
            function (caracteristica) {

                const item =
                    document.createElement("li");


                item.textContent =
                    caracteristica;


                listaCaracteristicas.appendChild(
                    item
                );

            }
        );


        modal.classList.add(
            "activo"
        );


        modal.setAttribute(
            "aria-hidden",
            "false"
        );


        document.body.classList.add(
            "modal-abierto"
        );


        botonCerrar.focus();

    }


    /* ================================================= */
    /* CERRAR MODAL */
    /* ================================================= */

    function cerrarModal() {

        modal.classList.remove(
            "activo"
        );


        modal.setAttribute(
            "aria-hidden",
            "true"
        );


        document.body.classList.remove(
            "modal-abierto"
        );


        if (elementoAnterior) {

            elementoAnterior.focus();

        }

    }


    /* ================================================= */
    /* BOTONES VER DETALLES */
    /* ================================================= */

    botonesDetalle.forEach(
        function (boton) {

            boton.addEventListener(
                "click",
                function () {

                    const producto =
                        boton.dataset.producto;


                    abrirModal(producto);

                }
            );

        }
    );


    /* ================================================= */
    /* BOTONES PARA CERRAR */
    /* ================================================= */

    botonesCerrar.forEach(
        function (boton) {

            boton.addEventListener(
                "click",
                cerrarModal
            );

        }
    );


    /* ================================================= */
    /* TECLADO */
/* ================================================= */

    document.addEventListener(
        "keydown",
        function (evento) {

            if (
                !modal.classList.contains(
                    "activo"
                )
            ) {

                return;

            }


            /* ESCAPE */

            if (evento.key === "Escape") {

                cerrarModal();

                return;

            }


            /* TAB DENTRO DEL MODAL */

            if (evento.key === "Tab") {

                const elementosEnfocables =
                    modal.querySelectorAll(
                        'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
                    );


                const elementos =
                    Array.from(
                        elementosEnfocables
                    );


                if (elementos.length === 0) {
                    return;
                }


                const primero =
                    elementos[0];

                const ultimo =
                    elementos[
                        elementos.length - 1
                    ];


                if (
                    evento.shiftKey &&
                    document.activeElement === primero
                ) {

                    evento.preventDefault();

                    ultimo.focus();

                }

                else if (
                    !evento.shiftKey &&
                    document.activeElement === ultimo
                ) {

                    evento.preventDefault();

                    primero.focus();

                }

            }

        }
    );

}