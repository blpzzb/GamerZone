document.addEventListener(
    "DOMContentLoaded",
    function () {

        iniciarCheckout();

    }
);


/* ================================================= */
/* GAMERZONE - CHECKOUT */
/* ================================================= */

function iniciarCheckout() {

    const CLAVE_CARRITO =
        "gamerzone_carrito";


    /* ================================================= */
    /* ELEMENTOS */
    /* ================================================= */

    const formulario =
        document.getElementById(
            "formularioCheckout"
        );

    const nombre =
        document.getElementById(
            "checkoutNombre"
        );

    const correo =
        document.getElementById(
            "checkoutCorreo"
        );

    const telefono =
        document.getElementById(
            "checkoutTelefono"
        );

    const metodoPago =
        document.getElementById(
            "checkoutMetodoPago"
        );

    const terminos =
        document.getElementById(
            "checkoutTerminos"
        );

    const botonesMetodo =
        document.querySelectorAll(
            ".metodo-pago"
        );

    const detalleMetodo =
        document.getElementById(
            "detalleMetodoPago"
        );

    const contenedorProductos =
        document.getElementById(
            "checkoutProductos"
        );

    const checkoutVacio =
        document.getElementById(
            "checkoutVacio"
        );

    const checkoutTotales =
        document.getElementById(
            "checkoutTotales"
        );

    const cantidadElemento =
        document.getElementById(
            "checkoutCantidad"
        );

    const totalElemento =
        document.getElementById(
            "checkoutTotal"
        );

    const botonConfirmar =
        document.getElementById(
            "botonConfirmarPedido"
        );

    const confirmacion =
        document.getElementById(
            "confirmacionPedido"
        );

    const confirmacionNumero =
        document.getElementById(
            "confirmacionNumero"
        );

    const confirmacionMetodo =
        document.getElementById(
            "confirmacionMetodo"
        );

    const confirmacionTotal =
        document.getElementById(
            "confirmacionTotal"
        );


    if (!formulario) {

        return;

    }


    /* ================================================= */
    /* PRODUCTOS */
    /* ================================================= */

    const productos = {

        teclado: {

            id:
                "teclado",

            nombre:
                "Teclado Mecánico RGB",

            precio:
                59990,

            imagen:
                "img/teclado.jpg"

        },


        mouse: {

            id:
                "mouse",

            nombre:
                "Mouse Gamer RGB",

            precio:
                29990,

            imagen:
                "img/mouse.jpg"

        },


        audifonos: {

            id:
                "audifonos",

            nombre:
                "Audífonos Gamer",

            precio:
                49990,

            imagen:
                "img/audifonos.jpg"

        },


        monitor: {

            id:
                "monitor",

            nombre:
                "Monitor Gamer 165 Hz",

            precio:
                199990,

            imagen:
                "img/monitor.jpg"

        },


        silla: {

            id:
                "silla",

            nombre:
                "Silla Gamer Pro",

            precio:
                149990,

            imagen:
                "img/silla.jpg"

        },


        control: {

            id:
                "control",

            nombre:
                "Control Gamer Pro",

            precio:
                54990,

            imagen:
                "img/control.jpg"

        },


        gpu: {

            id:
                "gpu",

            nombre:
                "Tarjeta Gráfica Gamer",

            precio:
                649990,

            imagen:
                "img/gpu.jpg"

        },


        pc: {

            id:
                "pc",

            nombre:
                "PC Gamer RGB Pro",

            precio:
                1199990,

            imagen:
                "img/pc-gamer.jpg"

        }

    };


    let carrito = [];

    let totalPedido = 0;


    /* ================================================= */
    /* FORMATEAR PRECIO */
    /* ================================================= */

    function formatearPrecio(valor) {

        return new Intl.NumberFormat(
            "es-CL",
            {
                style:
                    "currency",

                currency:
                    "CLP",

                maximumFractionDigits:
                    0
            }
        ).format(valor);

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

                            const producto =
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

                                ...producto,

                                cantidad:
                                    cantidad

                            };

                        }
                    );

        }

        catch (error) {

            console.error(
                "No se pudo cargar el carrito.",
                error
            );


            carrito = [];

        }

    }


    /* ================================================= */
    /* RENDERIZAR RESUMEN */
    /* ================================================= */

    function renderizarResumen() {

        contenedorProductos.innerHTML = "";


        let cantidadTotal = 0;

        totalPedido = 0;


        carrito.forEach(
            function (producto) {

                cantidadTotal +=
                    producto.cantidad;


                const subtotal =
                    producto.precio *
                    producto.cantidad;


                totalPedido +=
                    subtotal;


                const item =
                    document.createElement(
                        "article"
                    );


                item.className =
                    "checkout-producto";


                item.innerHTML = `

                    <img
                        src="${producto.imagen}"
                        alt="${producto.nombre}"
                    >


                    <div class="checkout-producto-info">

                        <h3>
                            ${producto.nombre}
                        </h3>

                        <span>
                            Cantidad: ${producto.cantidad}
                        </span>

                    </div>


                    <strong class="checkout-producto-precio">
                        ${formatearPrecio(subtotal)}
                    </strong>

                `;


                contenedorProductos.appendChild(
                    item
                );

            }
        );


        cantidadElemento.textContent =
            `${cantidadTotal} producto${cantidadTotal !== 1 ? "s" : ""}`;


        totalElemento.textContent =
            formatearPrecio(
                totalPedido
            );


        const estaVacio =
            carrito.length === 0;


        contenedorProductos.hidden =
            estaVacio;


        checkoutVacio.hidden =
            !estaVacio;


        checkoutTotales.hidden =
            estaVacio;


        botonConfirmar.disabled =
            estaVacio;

    }


    /* ================================================= */
    /* MÉTODOS DE PAGO */
    /* ================================================= */

    const informacionMetodos = {

        tarjeta: {

            titulo:
                "Pago con tarjeta",

            texto:
                "En esta demostración se simula la selección de tarjeta de débito o crédito. No se solicitan ni procesan datos bancarios reales."

        },


        transferencia: {

            titulo:
                "Transferencia bancaria",

            texto:
                "Al confirmar el pedido se registrará Transferencia bancaria como método seleccionado. Las instrucciones bancarias serían entregadas por un sistema real de pago."

        },


        retiro: {

            titulo:
                "Pago al retirar",

            texto:
                "El pedido se registra y el pago sería realizado presencialmente al momento de retirar los productos."

        }

    };


    function seleccionarMetodo(
        boton
    ) {

        botonesMetodo.forEach(
            function (item) {

                item.classList.remove(
                    "activo"
                );


                item.setAttribute(
                    "aria-pressed",
                    "false"
                );

            }
        );


        boton.classList.add(
            "activo"
        );


        boton.setAttribute(
            "aria-pressed",
            "true"
        );


        const metodo =
            boton.dataset.metodo;


        metodoPago.value =
            metodo;


        const informacion =
            informacionMetodos[metodo];


        detalleMetodo.innerHTML = `

            <strong>
                ${informacion.titulo}
            </strong>

            <p>
                ${informacion.texto}
            </p>

        `;


        detalleMetodo.hidden =
            false;


        mostrarError(
            "errorCheckoutMetodo",
            ""
        );

    }


    botonesMetodo.forEach(
        function (boton) {

            boton.setAttribute(
                "aria-pressed",
                "false"
            );


            boton.addEventListener(
                "click",
                function () {

                    seleccionarMetodo(
                        boton
                    );

                }
            );

        }
    );


    /* ================================================= */
    /* ERRORES */
    /* ================================================= */

    function mostrarError(
        id,
        mensaje
    ) {

        const elemento =
            document.getElementById(
                id
            );


        if (elemento) {

            elemento.textContent =
                mensaje;

        }

    }


    function estadoCampo(
        campo,
        correcto
    ) {

        campo.classList.remove(
            "campo-error",
            "campo-correcto"
        );


        if (correcto) {

            campo.classList.add(
                "campo-correcto"
            );

        }

        else {

            campo.classList.add(
                "campo-error"
            );

        }

    }


    /* ================================================= */
    /* VALIDAR NOMBRE */
    /* ================================================= */

    function validarNombre() {

        const valor =
            nombre.value.trim();


        const valido =
            /^[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s]{3,}$/
                .test(valor);


        if (!valor) {

            mostrarError(
                "errorCheckoutNombre",
                "Ingresa tu nombre completo."
            );


            estadoCampo(
                nombre,
                false
            );


            return false;

        }


        if (!valido) {

            mostrarError(
                "errorCheckoutNombre",
                "Utiliza al menos 3 letras."
            );


            estadoCampo(
                nombre,
                false
            );


            return false;

        }


        mostrarError(
            "errorCheckoutNombre",
            ""
        );


        estadoCampo(
            nombre,
            true
        );


        return true;

    }


    /* ================================================= */
    /* VALIDAR CORREO */
    /* ================================================= */

    function validarCorreo() {

        const valor =
            correo.value.trim();


        const valido =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                .test(valor);


        if (!valor) {

            mostrarError(
                "errorCheckoutCorreo",
                "Ingresa tu correo electrónico."
            );


            estadoCampo(
                correo,
                false
            );


            return false;

        }


        if (!valido) {

            mostrarError(
                "errorCheckoutCorreo",
                "Ingresa un correo válido."
            );


            estadoCampo(
                correo,
                false
            );


            return false;

        }


        mostrarError(
            "errorCheckoutCorreo",
            ""
        );


        estadoCampo(
            correo,
            true
        );


        return true;

    }


    /* ================================================= */
    /* VALIDAR TELÉFONO */
    /* ================================================= */

    function validarTelefono() {

        const valor =
            telefono.value.trim();


        const valido =
            /^\d{9}$/
                .test(valor);


        if (!valor) {

            mostrarError(
                "errorCheckoutTelefono",
                "Ingresa tu teléfono."
            );


            estadoCampo(
                telefono,
                false
            );


            return false;

        }


        if (!valido) {

            mostrarError(
                "errorCheckoutTelefono",
                "Debe contener exactamente 9 dígitos."
            );


            estadoCampo(
                telefono,
                false
            );


            return false;

        }


        mostrarError(
            "errorCheckoutTelefono",
            ""
        );


        estadoCampo(
            telefono,
            true
        );


        return true;

    }


    /* ================================================= */
    /* VALIDAR MÉTODO */
    /* ================================================= */

    function validarMetodo() {

        if (!metodoPago.value) {

            mostrarError(
                "errorCheckoutMetodo",
                "Selecciona un método de pago."
            );


            return false;

        }


        mostrarError(
            "errorCheckoutMetodo",
            ""
        );


        return true;

    }


    /* ================================================= */
    /* VALIDAR TÉRMINOS */
    /* ================================================= */

    function validarTerminos() {

        if (!terminos.checked) {

            mostrarError(
                "errorCheckoutTerminos",
                "Debes confirmar que revisaste el pedido."
            );


            return false;

        }


        mostrarError(
            "errorCheckoutTerminos",
            ""
        );


        return true;

    }


    /* ================================================= */
    /* TELÉFONO SOLO NÚMEROS */
    /* ================================================= */

    telefono.addEventListener(
        "input",
        function () {

            telefono.value =
                telefono.value
                    .replace(
                        /\D/g,
                        ""
                    )
                    .slice(
                        0,
                        9
                    );

        }
    );


    /* ================================================= */
    /* VALIDACIONES AL SALIR */
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


    terminos.addEventListener(
        "change",
        validarTerminos
    );


    /* ================================================= */
    /* NOMBRE DEL MÉTODO */
    /* ================================================= */

    function obtenerNombreMetodo(
        metodo
    ) {

        if (
            metodo ===
            "tarjeta"
        ) {

            return "Tarjeta";

        }


        if (
            metodo ===
            "transferencia"
        ) {

            return "Transferencia bancaria";

        }


        return "Pago al retirar";

    }


    /* ================================================= */
    /* GENERAR NÚMERO PEDIDO */
    /* ================================================= */

    function generarNumeroPedido() {

        const numero =
            Math.floor(
                100000 +
                Math.random() *
                900000
            );


        return (
            "GZ-" +
            numero
        );

    }


    /* ================================================= */
    /* CONFIRMAR PEDIDO */
    /* ================================================= */

    formulario.addEventListener(
        "submit",
        function (evento) {

            evento.preventDefault();


            if (
                carrito.length === 0
            ) {

                return;

            }


            const nombreValido =
                validarNombre();


            const correoValido =
                validarCorreo();


            const telefonoValido =
                validarTelefono();


            const metodoValido =
                validarMetodo();


            const terminosValidos =
                validarTerminos();


            const formularioValido =
                (
                    nombreValido &&
                    correoValido &&
                    telefonoValido &&
                    metodoValido &&
                    terminosValidos
                );


            if (!formularioValido) {

                const primerError =
                    formulario.querySelector(
                        ".campo-error"
                    );


                if (primerError) {

                    primerError.focus();

                }


                return;

            }


            const numeroPedido =
                generarNumeroPedido();


            confirmacionNumero.textContent =
                numeroPedido;


            confirmacionMetodo.textContent =
                obtenerNombreMetodo(
                    metodoPago.value
                );


            confirmacionTotal.textContent =
                formatearPrecio(
                    totalPedido
                );


            localStorage.removeItem(
                CLAVE_CARRITO
            );


            document.querySelector(
                ".checkout-contenedor"
            ).hidden = true;


            document.querySelector(
                ".checkout-portada"
            ).hidden = true;


            confirmacion.hidden =
                false;


            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );


    /* ================================================= */
    /* INICIAR */
    /* ================================================= */

    cargarCarrito();

    renderizarResumen();

}