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
                            <button type="button" class="btn btn-outline-success" id="boton_carrito_producto${producto.id}">Agregar al carrito<i class="fas fa-shopping-basket ps-2"></i></button>            
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
                            <button type="button" class="btn btn-outline-success" id="boton_carrito_producto${producto.id}">Agregar al carrito<i class="fas fa-shopping-basket ps-2"></i></button>
                        </div>
                    </div>
                `
            }
        })
        //AGREGAR PRODUCTOS AL CARRITO
        let carrito = []
        let total = 0
        data.forEach((producto, indice) => {
            if (localStorage.length > 0) {
                carrito = JSON.parse(localStorage.getItem('carrito'))
            }
            
            document.getElementById(`boton_carrito_producto${producto.id}`).addEventListener('click', () => {
                total = JSON.parse(localStorage.getItem('total'))
                event.preventDefault()

                let found = carrito.find(productoCarrito => productoCarrito.id === producto.id)
                if (found != null && found.cantidad > 0) {
                    found.cantidad++
                }
                else {
                    producto.cantidad = 1
                    carrito.push(producto)
                }
                total = total + producto.precio
                localStorage.setItem('carrito', JSON.stringify(carrito))
                localStorage.setItem('total', JSON.stringify(total))
            })
        })






        //MOSTRAR CARRITO
        let carrito_compras_html = document.getElementById('modal-body')


        document.getElementById('boton_carrito').addEventListener('click', () => {

            let productos_parseados = JSON.parse(localStorage.getItem('carrito'))
            let total = JSON.parse(localStorage.getItem('total'))
            carrito_compras_html.innerHTML = ''
            if (productos_parseados != null && productos_parseados.length > 0) {
                productos_parseados.forEach((producto, indice) => {
                    carrito_compras_html.innerHTML += `
            
                <div class="card m-2 card_carrito" style="width: 150px; height: auto; border:white" id="producto_carrito${producto.id}">
                    <div class="card-body card_productos_carrito">
                    <img src="multimedia/producto${producto.id}.jpg" class="card-img-top imagen_carrito" alt="imagen_producto">
                        <div class="informacion_producto">
                            <p class="card-text nombre">${producto.nombre} - <strong>${producto.marca}</strong> </p>
                            <p class="card-text precio">$${producto.precio} </p>
                            <p class="card-text cantidad">cantidad: ${producto.cantidad} </p>
                            <div class="botones d-flex">
                            <button type="button" class="btn btn-outline-secondary boton_cantidad" id="boton_bajar_cantidad${producto.id}">-</button>
                            <button type="button" class="btn btn-outline-primary boton_cantidad" id="boton_subir_cantidad${producto.id}">+</button>
                            <button type="button" class="btn btn-outline-danger boton_borrar" id="boton_borrar_producto${producto.id}">Borrar producto<i class="fas fa-trash-alt ms-2"></i></button>
                            </div>
                        </div>
                    </div>
                </div>                

            `
                })

                carrito_compras_html.innerHTML += `
                <h3>Total: $${total}</h3>
                
                `


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
                    let lugar = carrito.findIndex(productoCarrito => productoCarrito.id == producto.id)
                    total = total - (producto.precio * producto.cantidad)
                    producto.cantidad = 0
                    carrito.splice(lugar, 1)
                    localStorage.setItem('carrito', JSON.stringify(carrito))
                    localStorage.setItem('total', JSON.stringify(total))
                })
            })


            //bajar cantidad producto
            carrito.forEach((producto, indice) => {
                document.getElementById(`boton_bajar_cantidad${producto.id}`).addEventListener('click', () => {
                    event.preventDefault()
                    let found = carrito.find(productoCarrito => productoCarrito.id === producto.id)
                    if (found != null && found.cantidad > 1) {
                        found.cantidad--
                    }
                    else {
                        let lugar = carrito.findIndex(productoCarrito => productoCarrito.id === producto.id)
                        carrito.splice(lugar, 1)
                    }
                    localStorage.setItem('carrito', JSON.stringify(carrito))
                    total = total - producto.precio
                    localStorage.setItem('total', JSON.stringify(total))
                })
            })


            //subir cantidad producto
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
                    total = total + producto.precio
                    localStorage.setItem('total', JSON.stringify(total))
                })
            })
        })


        let boton_finalizar_compra_html = document.getElementById('boton_finalizar_compra')
        boton_finalizar_compra_html.addEventListener('click', () => {
            data.forEach((producto, indice) => {
                producto.cantidad = 0
            })
            carrito = []
            total = 0

            localStorage.setItem('carrito', JSON.stringify([]))
            localStorage.setItem('total', 0)
            swal.fire("Gracias por su compra!", "Los productos seran enviados en la brevedad", "success")
        })


    })









    .catch(error => console.log(error))









