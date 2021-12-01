let productos_destacados_html = document.getElementById('productos_destacados')

productos_destacados.forEach((producto, indice) => {

    productos_destacados_html.innerHTML += `
    <div class="card m-2 " id="producto${producto.id}" style="width: 18rem;">
    <img src="multimedia/producto${producto.id}.jpg" class="card-img-top imagen" alt="...">
        <div class="card-body card_productos">
        <p class="card-text nombre">${producto.nombre} - <strong>${producto.marca}</strong> </p>
        <p class="card-text descripcion">${producto.descripcion} </p>
        <p class="card-text precio">$${producto.precio} </p>
        <button type="button" class="btn" id="boton_carrito_producto${producto.id}">Agregar al carrito <i class="fas fa-shopping-basket"></i></button>
        </div>
    </div>
    `
})



let productos_nuevos_html = document.getElementById('productos_nuevos')

productos_nuevos.forEach((producto, indice) => {

    productos_nuevos_html.innerHTML += `
    <div class="card m-2 " id="producto${producto.id}" style="width: 18rem;">
    <img src="multimedia/producto${producto.id}.jpg" class="card-img-top imagen" alt="...">
        <div class="card-body card_productos">
        <p class="card-text nombre">${producto.nombre} - <strong>${producto.marca}</strong> </p>
        <p class="card-text descripcion">${producto.descripcion} </p>
        <p class="card-text precio">$${producto.precio} </p>
        <button type="button" class="btn" id="boton_carrito_producto${producto.id}">Agregar al carrito <i class="fas fa-shopping-basket"></i></button>
        </div>
    </div>
    `
})



let productos_ofertas_html = document.getElementById('productos_ofertas')

productos_ofertas.forEach((producto, indice) => {

    productos_ofertas_html.innerHTML += `
    <div class="card m-2" id="producto${producto.id}" style="width: 18rem;">
    <img src="multimedia/producto${producto.id}.jpg" class="card-img-top imagen" alt="...">
        <div class="card-body  card_productos">
        <p class="card-text nombre">${producto.nombre} - <strong>${producto.marca}</strong> </p>
        <p class="card-text descripcion">${producto.descripcion} </p>
        <p class="card-text precio">$${producto.precio} </p>
        <button type="button" class="btn" id="boton_carrito_producto${producto.id}">Agregar al carrito <i class="fas fa-shopping-basket"></i></button>
        </div>
    </div>
    `
})
