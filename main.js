
//Variables
const carrito = document.getElementById("carrito"),
    listaSillones = document.getElementById("lista-sillones"),
    contenedorCarrito = document.querySelector('.buy-card .lista_de_sillones'),
    vaciarCarritoBtn = document.querySelector('#vaciar_carrito');

let articulosCarrito = [];

registrarEventsListeners()

function registrarEventsListeners() {
    //Cuando le de click a "agregar al carrito de compras"
    listaSillones.addEventListener('click', agregarSillon);

    //Eliminar sillon del carrito
    carrito.addEventListener('click', eliminarSillon);

    // Muestra elementos del carrito.
    document.addEventListener("DOMContentLoaded", () => {
        articulosCarrito = JSON.parse(localStorage.getItem("carrito"))
        carritoHTML()
    })

    // Llama a la función para cargar los sillones cuando sea necesario
    document.addEventListener("DOMContentLoaded", () => {
        cargarSillones();
    });
    
    //Vaciar el carrito
    vaciarCarritoBtn.addEventListener('click', e => {
        articulosCarrito = [];
        limpiarHTML()
    })
}
// Esta función cargará los sillones desde el archivo JSON
function cargarSillones() {
    fetch("./productos.json")
        .then(response => {
            if (!response.ok) {
                throw new Error('La solicitud no fue exitosa');
            }
            return response.json();
        })
        .then(data => {
            sillones = data;
            mostrarSillonesEnPagina(sillones);
        })
        .catch(error => {
            console.error('Error al obtener datos del archivo JSON:', error);
        });
}

function agregarSillon(e) {
    if (e.target.classList.contains("agregar-carrito")) {
        Toastify({
            text: "Agregaste un sillon al carrito",
            duration: 3000,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
                background: "linear-gradient(to right, #ffc0cb, #ffecb3)",
                color: "black",
                borderRadius: "1rem"
            },
            offset: {
                x: "2rem", // horizontal axis - can be a number or a string indicating unity. eg: '2em'
                y: "2rem" // vertical axis - can be a number or a string indicating unity. eg: '2em'
            },
            onClick: function () { } // Callback after click
        }).showToast();
        const sillonSeleccionado = e.target.parentElement.parentElement;
        leerInfo(sillonSeleccionado)
    }
}

//Elimina un sillon del carrito
function eliminarSillon(e) {

    if (e.target.classList.contains("borrar-sillon")) {
        const sillonId = e.target.getAttribute('data-id');

        //Eliminar del arreglo del articulosCarrito por el data-id
        articulosCarrito = articulosCarrito.filter(sillon => sillon.id !== sillonId)

        carritoHTML()

    }
}

//Leer el contenido de nuestro HTML al que se le da click y extrae la info del sillon.
function leerInfo(sillon) {
    const infoSillon = {
        imagen: sillon.querySelector('img').src,
        titulo: sillon.querySelector('h3').textContent,
        precio: sillon.querySelector('.descuento').textContent,
        id: sillon.querySelector('button').getAttribute('data-')
    }

    const existe = articulosCarrito.some(sillonCarrito => sillonCarrito.id === infoSillon.id);

    if (existe) {
        articulosCarrito = articulosCarrito.map(sillonCarrito => {
            if (sillonCarrito.id === infoSillon.id) {
                sillonCarrito.cantidad++;
            }
            return sillonCarrito;
        });
    } else {
        infoSillon.cantidad = 1;
        articulosCarrito.push(infoSillon);
    }
    carritoHTML();
}

//Muestra el carrito en el HTML.

function carritoHTML() {
    limpiarHTML()
    //Recorre el carrito de compras y genera el HTML.
    articulosCarrito.forEach(sillon => {
        const fila = document.createElement('div');
        fila.innerHTML = `
            <img src="${sillon.imagen}"></img>
            <p>${sillon.titulo}</p>
            <p>${sillon.precio}</p>
            <p>${sillon.cantidad}</p>
            <p><span class="borrar-sillon" data-id="${sillon.id}">X</span></p>
        `;

        contenedorCarrito.appendChild(fila)
    });
}

//Elimina los sillones de la lista_de_sillones.
function limpiarHTML() {
    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
    sincronizarStorage()
}

// Sincronizar con LocalStorage.
function sincronizarStorage() {
    localStorage.setItem("carrito", JSON.stringify(articulosCarrito))
}
function cargarSillones() {
    fetch('./sillones.json')
        .then(response => response.json())
        .then(data => {
            // Verifica si existe la propiedad "sillones" en el objeto JSON.
            if (data && data.sillones && Array.isArray(data.sillones)) {
                const sillones = data.sillones;
                
            }
        })
}
