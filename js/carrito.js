document.addEventListener(
    "DOMContentLoaded",
    function () {

        iniciarCarrito();

    }
);


/* ================================================= */
/* CARRITO DE COMPRAS */
/* ================================================= */

function iniciarCarrito() {

    const botonAbrir =
        document.getElementById("abrirCarrito");

    const botonCerrar =
        document.getElementById("cerrarCarrito");

    const overlay =
        document.getElementById("carritoOverlay");

    const panel =
        document.getElementById("carritoPanel");

    const contador =
        document.getElementById("carritoContador");

    const lista =
        document.getElementById("carritoLista");

    const carritoVacio =
        document.getElementById("carritoVacio");

    const cantidadResumen =
        document.getElementById("carritoCantidadResumen");

    const total =
        document.getElementById("carritoTotal");

    const botonVaciar =
        document.getElementById("vaciarCarrito");

    const notificacion =
        document.getElementById("notificacionCarrito");

    const botonesAgregar =
        document.querySelectorAll(
            ".boton-agregar-carrito"
        );


    if (
        !botonAbrir ||
        !botonCerrar ||
        !overlay ||
        !panel ||
        !lista
    ) {

        return;

    }


    /* ================================================= */
    /* CONFIGURACIÓN LOCALSTORAGE */
    /* ================================================= */

    const CLAVE_CARRITO =
        "gamerzone_carrito";


    let carrito = [];

    let temporizadorNotificacion;


    /* ================================================= */
    /* CATÁLOGO DE PRODUCTOS */
    /* ================================================= */

    const productos = {

        teclado: {

            id: "teclado",

            nombre:
                "Teclado Mecánico RGB",

            precio:
                59990,

            imagen:
                "img/teclado.jpg"

        },


        mouse: {

            id: "mouse",

            nombre:
                "Mouse Gamer RGB",

            precio:
                29990,

            imagen:
                "img/mouse.jpg"

        },


        audifonos: {

            id: "audifonos",

            nombre:
                "Audífonos Gamer",

            precio:
                49990,

            imagen:
                "img/audifonos.jpg"

        },


        monitor: {

            id: "monitor",

            nombre:
                "Monitor Gamer 165 Hz",

            precio:
                199990,

            imagen:
                "img/monitor.jpg"

        },


        silla: {

            id: "silla",

            nombre:
                "Silla Gamer Pro",

            precio:
                149990,

            imagen:
                "img/silla.jpg"

        },


        control: {

            id: "control",

            nombre:
                "Control Gamer Pro",

            precio:
                54990,

            imagen:
                "img/control.jpg"

        },


        gpu: {

            id: "gpu",

            nombre:
                "Tarjeta Gráfica Gamer",

            precio:
                649990,

            imagen:
                "img/gpu.jpg"

        },


        pc: {

            id: "pc",

            nombre:
                "PC Gamer RGB Pro",

            precio:
                1199990,

            imagen:
                "img/pc-gamer.jpg"

        }

    };


    /* ================================================= */
    /* FORMATEAR PRECIO */
/* ================================================= */

    function formatearPrecio(valor) {

        return new Intl.NumberFormat(
            "es-CL",
            {
                style: "currency",

                currency: "CLP",

                maximumFractionDigits: 0
            }
        ).format(valor);

    }


    /* ================================================= */
    /* GUARDAR CARRITO */
/* ================================================= */

    function guardarCarrito() {

        const datosParaGuardar =
            carrito.map(
                function (producto) {

                    return {

                        id:
                            producto.id,

                        cantidad:
                            producto.cantidad

                    };

                }
            );


        localStorage.setItem(
            CLAVE_CARRITO,
            JSON.stringify(datosParaGuardar)
        );

    }


    /* ================================================= */
    /* CARGAR CARRITO */
/* ================================================= */

    function cargarCarrito() {

        const carritoGuardado =
            localStorage.getItem(
                CLAVE_CARRITO
            );


        if (!carritoGuardado) {

            carrito = [];

            return;

        }


        try {

            const datos =
                JSON.parse(
                    carritoGuardado
                );


            if (!Array.isArray(datos)) {

                carrito = [];

                return;

            }


            carrito =
                datos
                    .filter(
                        function (item) {

                            return (
                                item &&
                                productos[item.id]
                            );

                        }
                    )
                    .map(
                        function (item) {

                            const productoOriginal =
                                productos[item.id];


                            let cantidad =
                                Number(
                                    item.cantidad
                                );


                            if (
                                !Number.isInteger(cantidad) ||
                                cantidad < 1
                            ) {

                                cantidad = 1;

                            }


                            return {

                                ...productoOriginal,

                                cantidad:
                                    cantidad

                            };

                        }
                    );

        }

        catch (error) {

            console.error(
                "No fue posible cargar el carrito guardado.",
                error
            );


            carrito = [];


            localStorage.removeItem(
                CLAVE_CARRITO
            );

        }

    }


    /* ================================================= */
    /* ABRIR CARRITO */
    /* ================================================= */

    function abrirCarrito() {

        panel.classList.add(
            "activo"
        );


        overlay.classList.add(
            "activo"
        );


        panel.setAttribute(
            "aria-hidden",
            "false"
        );


        document.body.classList.add(
            "carrito-abierto"
        );


        botonCerrar.focus();

    }


    /* ================================================= */
    /* CERRAR CARRITO */
    /* ================================================= */

    function cerrarCarrito() {

        panel.classList.remove(
            "activo"
        );


        overlay.classList.remove(
            "activo"
        );


        panel.setAttribute(
            "aria-hidden",
            "true"
        );


        document.body.classList.remove(
            "carrito-abierto"
        );


        botonAbrir.focus();

    }


    /* ================================================= */
    /* AGREGAR PRODUCTO */
    /* ================================================= */

    function agregarProducto(idProducto) {

        const producto =
            productos[idProducto];


        if (!producto) {

            return;

        }


        const productoExistente =
            carrito.find(
                function (item) {

                    return (
                        item.id ===
                        idProducto
                    );

                }
            );


        if (productoExistente) {

            productoExistente.cantidad++;

        }

        else {

            carrito.push({

                ...producto,

                cantidad: 1

            });

        }


        guardarCarrito();

        renderizarCarrito();


        mostrarNotificacion(
            producto.nombre
        );

    }


    /* ================================================= */
    /* CAMBIAR CANTIDAD */
    /* ================================================= */

    function cambiarCantidad(
        idProducto,
        cambio
    ) {

        const producto =
            carrito.find(
                function (item) {

                    return (
                        item.id ===
                        idProducto
                    );

                }
            );


        if (!producto) {

            return;

        }


        producto.cantidad +=
            cambio;


        if (
            producto.cantidad <= 0
        ) {

            eliminarProducto(
                idProducto
            );

            return;

        }


        guardarCarrito();

        renderizarCarrito();

    }


    /* ================================================= */
    /* ELIMINAR PRODUCTO */
    /* ================================================= */

    function eliminarProducto(
        idProducto
    ) {

        carrito =
            carrito.filter(
                function (item) {

                    return (
                        item.id !==
                        idProducto
                    );

                }
            );


        guardarCarrito();

        renderizarCarrito();

    }


    /* ================================================= */
    /* VACIAR CARRITO */
    /* ================================================= */

    function vaciarCarrito() {

        carrito = [];


        guardarCarrito();

        renderizarCarrito();

    }


    /* ================================================= */
    /* RENDERIZAR CARRITO */
    /* ================================================= */

    function renderizarCarrito() {

        lista.innerHTML = "";


        let cantidadTotal = 0;

        let totalCarrito = 0;


        carrito.forEach(
            function (producto) {

                cantidadTotal +=
                    producto.cantidad;


                totalCarrito +=
                    producto.precio *
                    producto.cantidad;


                const item =
                    document.createElement(
                        "article"
                    );


                item.className =
                    "carrito-item";


                item.innerHTML = `

                    <div class="carrito-item-imagen">

                        <img
                            src="${producto.imagen}"
                            alt="${producto.nombre}"
                        >

                    </div>


                    <div class="carrito-item-info">

                        <h3>
                            ${producto.nombre}
                        </h3>


                        <span class="carrito-item-precio">
                            ${formatearPrecio(producto.precio)}
                        </span>


                        <div class="carrito-item-controles">


                            <div class="carrito-cantidad">

                                <button
                                    type="button"
                                    data-accion="restar"
                                    data-producto="${producto.id}"
                                    aria-label="Disminuir cantidad de ${producto.nombre}"
                                >
                                    −
                                </button>


                                <span>
                                    ${producto.cantidad}
                                </span>


                                <button
                                    type="button"
                                    data-accion="sumar"
                                    data-producto="${producto.id}"
                                    aria-label="Aumentar cantidad de ${producto.nombre}"
                                >
                                    +
                                </button>

                            </div>


                            <button
                                type="button"
                                class="carrito-eliminar"
                                data-accion="eliminar"
                                data-producto="${producto.id}"
                            >
                                Eliminar
                            </button>


                        </div>

                    </div>

                `;


                lista.appendChild(
                    item
                );

            }
        );


        /* --------------------------------------------- */
        /* CONTADOR DEL HEADER */
        /* --------------------------------------------- */

        contador.textContent =
            cantidadTotal;


        /* --------------------------------------------- */
        /* RESUMEN */
        /* --------------------------------------------- */

        cantidadResumen.textContent =
            `${cantidadTotal} producto${cantidadTotal !== 1 ? "s" : ""}`;


        total.textContent =
            formatearPrecio(
                totalCarrito
            );


        /* --------------------------------------------- */
        /* ESTADO VACÍO */
        /* --------------------------------------------- */

        carritoVacio.hidden =
            carrito.length !== 0;


        lista.hidden =
            carrito.length === 0;


        /* --------------------------------------------- */
        /* BOTÓN VACIAR */
        /* --------------------------------------------- */

        botonVaciar.disabled =
            carrito.length === 0;

    }


    /* ================================================= */
    /* NOTIFICACIÓN */
    /* ================================================= */

    function mostrarNotificacion(
        nombreProducto
    ) {

        clearTimeout(
            temporizadorNotificacion
        );


        notificacion.innerHTML =
            `<strong>${nombreProducto}</strong> fue agregado al carrito.`;


        notificacion.classList.add(
            "activo"
        );


        temporizadorNotificacion =
            setTimeout(
                function () {

                    notificacion.classList.remove(
                        "activo"
                    );

                },
                2600
            );

    }


    /* ================================================= */
    /* BOTONES AGREGAR */
    /* ================================================= */

    botonesAgregar.forEach(
        function (boton) {

            boton.addEventListener(
                "click",
                function () {

                    agregarProducto(
                        boton.dataset.producto
                    );

                }
            );

        }
    );


    /* ================================================= */
    /* ACCIONES DENTRO DEL CARRITO */
    /* ================================================= */

    lista.addEventListener(
        "click",
        function (evento) {

            const boton =
                evento.target.closest(
                    "[data-accion]"
                );


            if (!boton) {

                return;

            }


            const accion =
                boton.dataset.accion;


            const idProducto =
                boton.dataset.producto;


            if (
                accion === "sumar"
            ) {

                cambiarCantidad(
                    idProducto,
                    1
                );

            }


            if (
                accion === "restar"
            ) {

                cambiarCantidad(
                    idProducto,
                    -1
                );

            }


            if (
                accion === "eliminar"
            ) {

                eliminarProducto(
                    idProducto
                );

            }

        }
    );


    /* ================================================= */
    /* ABRIR / CERRAR */
    /* ================================================= */

    botonAbrir.addEventListener(
        "click",
        abrirCarrito
    );


    botonCerrar.addEventListener(
        "click",
        cerrarCarrito
    );


    overlay.addEventListener(
        "click",
        cerrarCarrito
    );


    /* ================================================= */
    /* VACIAR */
    /* ================================================= */

    botonVaciar.addEventListener(
        "click",
        vaciarCarrito
    );


    /* ================================================= */
    /* TECLA ESCAPE */
    /* ================================================= */

    document.addEventListener(
        "keydown",
        function (evento) {

            if (
                evento.key === "Escape" &&
                panel.classList.contains(
                    "activo"
                )
            ) {

                cerrarCarrito();

            }

        }
    );


    /* ================================================= */
    /* INICIAR CARRITO GUARDADO */
    /* ================================================= */

    cargarCarrito();

    renderizarCarrito();

}