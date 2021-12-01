
//MOSTRAR PRODUCTOS


// let productos_todos_html = document.getElementById('div_productos_todos')

// productos_todos.forEach((producto, indice) => {

//     productos_todos_html.innerHTML += `
//     <div class="card m-2" id="producto${producto.id}" style="width: 18rem;">
//     <img src="multimedia/producto${producto.id}.jpg" class="card-img-top imagen" alt="...">
//         <div class="card-body  card_productos">
//         <p class="card-text nombre">${producto.nombre} - <strong>${producto.marca}</strong> </p>
//         <p class="card-text descripcion">${producto.descripcion} </p>
//         <p class="card-text precio">$${producto.precio} </p>
//         <button type="button" class="btn" id="boton_carrito_producto${producto.id}">Agregar al carrito <i class="fas fa-shopping-basket"></i></button>
//         </div>
//     </div>
//     `
// })



let productos_destacados_html = document.getElementById('div_productos_destacados')

productos_destacados.forEach((producto, indice) => {

    productos_destacados_html.innerHTML += `
    <div class="card m-2 " id="producto${producto.id}" style="width: 18rem;">
    <img src="multimedia/proximamente.jpg" class="card-img-top imagen" alt="...">
        <div class="card-body card_productos">
        <p class="card-text nombre">${producto.nombre} - <strong>${producto.marca}</strong> </p>
        <p class="card-text descripcion">${producto.descripcion} </p>
        <p class="card-text precio">$${producto.precio} </p>
        <button type="button" class="btn" id="boton_carrito_producto${producto.id}">Agregar al carrito <i class="fas fa-shopping-basket"></i></button>
        
        </div>
    </div>
    `
})


let productos_nuevos_html = document.getElementById('div_productos_nuevos')

productos_nuevos.forEach((producto, indice) => {

    productos_nuevos_html.innerHTML += `
    <div class="card m-2 " id="producto${producto.id}" style="width: 18rem;">
    <img src="multimedia/proximamente.jpg" class="card-img-top imagen" alt="...">
        <div class="card-body card_productos">
        <p class="card-text nombre">${producto.nombre} - <strong>${producto.marca}</strong> </p>
        <p class="card-text descripcion">${producto.descripcion} </p>
        <p class="card-text precio">$${producto.precio} </p>
        <button type="button" class="btn" id="boton_carrito_producto${producto.id}">Agregar al carrito <i class="fas fa-shopping-basket"></i></button>
        </div>
    </div>
    `
})



let productos_ofertas_html = document.getElementById('div_productos_ofertas')

productos_ofertas.forEach((producto, indice) => {

    productos_ofertas_html.innerHTML += `
    <div class="card m-2" id="producto${producto.id}" style="width: 18rem;">
    <img src="multimedia/proximamente.jpg" class="card-img-top imagen" alt="...">
        <div class="card-body  card_productos">
        <p class="card-text nombre">${producto.nombre} - <strong>${producto.marca}</strong> </p>
        <p class="card-text descripcion">${producto.descripcion} </p>
        <p class="card-text precio">$${producto.precio} </p>
        <button type="button" class="btn" id="boton_carrito_producto${producto.id}">Agregar al carrito <i class="fas fa-shopping-basket"></i></button>
        </div>
    </div>
    `
})




//AGREGAR PRODUCTOS AL CARRITO
let carrito = []
productos_destacados.forEach((producto, indice) => {
    if (localStorage.length > 0) {
        carrito = JSON.parse(localStorage.getItem('carrito'))
    }
    document.getElementById(`boton_carrito_producto${producto.id}`).addEventListener('click', () => {
        event.preventDefault()
        carrito.push(producto)
        localStorage.setItem('carrito', JSON.stringify(carrito))
    })
})

productos_ofertas.forEach((producto, indice) => {
    if (localStorage.length > 0) {
        carrito = JSON.parse(localStorage.getItem('carrito'))
    }
    document.getElementById(`boton_carrito_producto${producto.id}`).addEventListener('click', () => {
        event.preventDefault()
        carrito.push(producto)
        localStorage.setItem('carrito', JSON.stringify(carrito))
    })
})

productos_nuevos.forEach((producto, indice) => {
    if (localStorage.length > 0) {
        carrito = JSON.parse(localStorage.getItem('carrito'))
    }
    document.getElementById(`boton_carrito_producto${producto.id}`).addEventListener('click', () => {
        event.preventDefault()
        carrito.push(producto)
        localStorage.setItem('carrito', JSON.stringify(carrito))
    })
})











//MOSTRAR CARRITO
//ver como hacer para que no se repita el carrito cuando aprieto devuelta el boton.
//ver como hacer para que aparezcan los productos nuevos sin tener que actualizar la pagina.

let carrito_compras_html = document.getElementById('div_carrito_compras')
let productos_parseados = JSON.parse(localStorage.getItem('carrito'))

document.getElementById('boton_carrito').addEventListener('click', () => {
    carrito_compras_html.innerHTML += `
    <h2 class="d-flex justify-content-center mt-4">CARRITO</h2>
    `
    productos_parseados.forEach((producto, indice) => {
        carrito_compras_html.innerHTML += `
        <div class="card m-2" style="width: 170px; height: auto" id="producto_carrito${producto.id}">
        <img src="multimedia/proximamente.jpg" class="card-img-top imagen" alt="...">
        <div class="card-body card_productos">
            <p class="card-text nombre">${producto.nombre} - <strong>${producto.marca}</strong> </p>
            <p class="card-text descripcion">${producto.descripcion} </p>
            <p class="card-text precio">$${producto.precio} </p>
            <button type="button" class="btn boton_borrar" id="boton_borrar_producto${producto.id}">Borrar producto <i class="fas fa-shopping-basket"></i></button>
        </div>
    </div>
        `
    })
})





//prueba botones 
// carrito.forEach((producto, indice) => {
//     let boton1 = document.getElementById(`boton_borrar_producto${producto.id}`)
//     console.log(`boton_borrar_producto${producto.id}`, boton1)

//     let boton2 = document.getElementById(`boton_carrito_producto${producto.id}`)
//     console.log(`boton_carrito_producto${producto.id}`, boton2)
// })








///////////////////////////////////////////////////////////////////////////////////////////////////////////////

