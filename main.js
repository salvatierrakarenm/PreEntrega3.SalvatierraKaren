//Variables
const carrito = document.getElementById("carrito"),
    listaSillones = document.getElementById("lista-sillones"),
    contenedorCarrito = document.querySelector('.buy-card .lista_de_sillones'),
    vaciarCarritoBtn = document.querySelector('#vaciar_carrito');

let articulosCarrito = [];

registrarEventsListeners()

function registrarEventsListeners() {
    //Cuando yo le de click a "agregar al carrito de compras"
    listaSillones.addEventListener('click', agregarSillon);

    //Eliminar sillon del carrito
    carrito.addEventListener('click', eliminarSillon);

    // Muestra elementos del carrito.
    document.addEventListener("DOMContentLoaded", () => {
        articulosCarrito = JSON.parse(localStorage.getItem("carrito"))
        carritoHTML()
    })

    //Vaciar el carrito
    vaciarCarritoBtn.addEventListener('click', e => {
        articulosCarrito = [];
        limpiarHTML()
    })
}

function agregarSillon(e) {
    if (e.target.classList.contains("agregar-carrito")) {
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

//Muestra el carrito en el HTML

function carritoHTML() {
    limpiarHTML()
    //Recorre el carrito de compras y genera el HTML
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

//Elimina los sillones de la lista_de_cursos
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

