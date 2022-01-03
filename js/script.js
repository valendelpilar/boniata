fetch('js/productos.json')

    .then(response => response.json())
    .then(data => {


        //MOSTRAR ALFAJORES
        let alfajores_html = document.getElementById('div_alfajores')
        data.forEach((producto, indice) => {
            if (producto.tipo == "alfajor") {
                alfajores_html.innerHTML += `
                    <div class="card m-2 " id="producto${producto.id}" style="width: 18rem;">
                        <img src="multimedia/producto${producto.id}.jpg" class="card-img-top imagen" alt="...">
                        <div class="card-body card_productos">
                            <p class="card-text nombre">${producto.nombre} - <strong>${producto.marca}</strong> </p>
                            <p class="card-text descripcion">${producto.descripcion} </p>
                            <p class="card-text precio">$${producto.precio} </p>
                            <button type="button" class="btn btn-outline-success" id="boton_carrito_producto${producto.id}">Agregar al carrito</button>            
                        </div>
                    </div>
                `
            }
        })


        //MOSTRAR CHOCOLATES
        let chocolates_html = document.getElementById('div_chocolates')
        data.forEach((producto, indice) => {
            if (producto.tipo == "chocolate") {
                chocolates_html.innerHTML += `
                    <div class="card m-2 " id="producto${producto.id}" style="width: 18rem;">
                        <img src="multimedia/producto${producto.id}.jpg" class="card-img-top imagen" alt="...">
                        <div class="card-body card_productos">
                            <p class="card-text nombre">${producto.nombre} - <strong>${producto.marca}</strong> </p>
                            <p class="card-text descripcion">${producto.descripcion} </p>
                            <p class="card-text precio">$${producto.precio} </p>
                            <button type="button" class="btn btn-outline-success" id="boton_carrito_producto${producto.id}">Agregar al carrito</button>
                        </div>
                    </div>
                `
            }
        })



        //AGREGAR PRODUCTOS AL CARRITO
        let carrito = []
        data.forEach((producto, indice) => {
            if (localStorage.length > 0) {
                carrito = JSON.parse(localStorage.getItem('carrito'))
            }
            document.getElementById(`boton_carrito_producto${producto.id}`).addEventListener('click', () => {
                event.preventDefault()
                let found = carrito.find(productoCarrito => productoCarrito.id === producto.id)
                if (found != null && found.cantidad > 0) {
                    found.cantidad++
                }
                else {
                    producto.cantidad++
                    carrito.push(producto)
                }
                localStorage.setItem('carrito', JSON.stringify(carrito))
            })
        })







//MOSTRAR CARRITO
let carrito_compras_html = document.getElementById('modal-body')

document.getElementById('boton_carrito').addEventListener('click', () => {

    let productos_parseados = JSON.parse(localStorage.getItem('carrito'))
    carrito_compras_html.innerHTML = ''
    if (productos_parseados != null) {
        productos_parseados.forEach((producto, indice) => {
            carrito_compras_html.innerHTML += `
            
                <div class="card m-2" style="width: 150px; height: auto" id="producto_carrito${producto.id}">
                    <div class="card-body card_productos">
                    <img src="multimedia/producto${producto.id}.jpg" class="card-img-top imagen_carrito" alt="imagen_producto">
                        <p class="card-text nombre">${producto.nombre} - <strong>${producto.marca}</strong> </p>
                        <p class="card-text precio">$${producto.precio} </p>
                        <p class="card-text precio">Cantidad: ${producto.cantidad} </p>
                        <button type="button" class="btn btn-outline-danger" id="boton_borrar_producto${producto.id}">Borrar producto</button>
                        <button type="button" class="btn btn-secondary" id="boton_subir_cantidad${producto.id}">sumar</button>
                        <button type="button" class="btn btn-secondary" id="boton_bajar_cantidad${producto.id}">restar</button>
                    </div>
                </div>
            `
        })
    }
    else {
        carrito_compras_html.innerHTML += `
            <h4 class="d-flex justify-content-center mt-4">no hay productos</h4>
        `
    }

    //borrar productos del carrito
        carrito.forEach((producto, indice) => {
            document.getElementById(`boton_borrar_producto${producto.id}`).addEventListener('click', () => {
                event.preventDefault()
                let found = carrito.find(productoCarrito => productoCarrito.id === producto.id)
                if (found != null && found.cantidad > 1) {
                    found.cantidad--
                }
                else {
                    let lugar = carrito.findIndex(productoCarrito => productoCarrito.id === producto.id)
                    carrito.splice(lugar,1)
                }
                localStorage.setItem('carrito', JSON.stringify(carrito))
            })
        })



        carrito.forEach((producto, indice) => {
            document.getElementById(`boton_bajar_cantidad${producto.id}`).addEventListener('click', () => {
                event.preventDefault()
                let found = carrito.find(productoCarrito => productoCarrito.id === producto.id)
                if (found != null && found.cantidad > 1) {
                    found.cantidad--
                }
                else {
                    let lugar = carrito.findIndex(productoCarrito => productoCarrito.id === producto.id)
                    carrito.splice(lugar,1)
                }
                localStorage.setItem('carrito', JSON.stringify(carrito))
            })
        })
    
    
    
        carrito.forEach((producto, indice) => {
            if (localStorage.length > 0) {
                carrito = JSON.parse(localStorage.getItem('carrito'))
            }
            document.getElementById(`boton_subir_cantidad${producto.id}`).addEventListener('click', () => {
                event.preventDefault()
                let found = carrito.find(productoCarrito => productoCarrito.id === producto.id)
                if (found != null && found.cantidad > 0) {
                    found.cantidad++
                }
                localStorage.setItem('carrito', JSON.stringify(carrito))
            })
        })
    })





    
    

})






    

.catch(error => console.log(error))






let boton_finalizar_compra_html = document.getElementById('boton_finalizar_compra')
boton_finalizar_compra_html.addEventListener('click', () => {
    localStorage.setItem('carrito', JSON.stringify([]))
    alert("Gracias por su compra!")
})


