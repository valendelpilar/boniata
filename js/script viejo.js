fetch('js/productos.json')

    .then(response => response.json())
    .then(data => {

        let carrito = []
        let total = 0
        let alfajores_html = document.getElementById('div_alfajores')
        let chocolates_html = document.getElementById('div_chocolates')
        let carrito_compras_html = document.getElementById('modal-body')
        let boton_finalizar_compra_html = document.getElementById('boton_finalizar_compra')
        let boton_carrito = document.getElementById('boton_carrito')


        //AGREGAR DATOS AL LOCAL STORAGE
        const agregar_local_storage = (carrito, total) => {
            localStorage.setItem('carrito', JSON.stringify(carrito))
            localStorage.setItem('total', JSON.stringify(total))
        }


        //MOSTRAR ALFAJORES
        data.map((producto) => {
            if (producto.tipo == "alfajor") {
                alfajores_html.innerHTML += `
                    <div class="d-flex p-2 m-2 flex-md-column bg-danger bg-gradient bg-opacity-10 justify-content-center text-center border border-danger card_font" id="producto${producto.id}" style="width: 18rem;">
                        <img src="multimedia/producto${producto.id}.jpg" class="imagen" alt="imagen">
                        <p>${producto.nombre} - <strong>${producto.marca}</strong> </p>
                        <p class="fs-6">${producto.descripcion} </p>
                        <p class="precio">$${producto.precio} </p>
                        <button type="button" class="btn btn-dark bg-gradient boton_carrito_producto" id="boton_carrito_producto${producto.id}">Agregar al carrito<i class="fas fa-shopping-basket ps-2"></i></button>            
                    </div>
                `
            }
        })


        //MOSTRAR CHOCOLATES
        data.map((producto) => {
            if (producto.tipo == "chocolate") {
                chocolates_html.innerHTML += `
                    <div class="d-flex p-2 m-2 flex-md-column bg-danger bg-gradient bg-opacity-10 justify-content-center border border-danger text-center card_font" id="producto${producto.id}" style="width: 18rem;">
                        <img src="multimedia/producto${producto.id}.jpg" class="imagen" alt="imagen">
                        <p class=>${producto.nombre} - <strong>${producto.marca}</strong> </p>
                        <p class=>${producto.descripcion} </p>
                        <p class="precio">$${producto.precio} </p>
                        <button type="button" class="btn btn-dark bg-gradient boton_carrito_producto" id="boton_carrito_producto${producto.id}">Agregar al carrito<i class="fas fa-shopping-basket ps-2"></i></button>            
                    </div>
                `
            }
        })


        //AGREGAR PRODUCTOS AL CARRITO
        data.map((producto) => {
            document.getElementById(`boton_carrito_producto${producto.id}`).onclick = () => {

                if (localStorage.length > 0) {
                    carrito = JSON.parse(localStorage.getItem('carrito'))
                    total = JSON.parse(localStorage.getItem('total'))
                }

                let index = carrito.findIndex(productoCarrito => productoCarrito.id == producto.id)

                console.log(producto.cantidad);
                agregar_carrito(carrito, producto, total)
                alert('Producto agregado correctamente al carrito!')
            }
        })


        const agregar_carrito = (carrito, producto, total) => {

            let index = carrito.findIndex(productoCarrito => productoCarrito.id == producto.id)

            console.log('index',index);
            if (index >= 0) {
                // carrito.splice(index, 1)
                console.log('cantidad',carrito[index].cantidad);
                carrito[index].cantidad++
            }
            else {
                producto.cantidad = 1
                carrito.push(producto)
            }

            total = total + producto.precio

            agregar_local_storage(carrito,total)
        }


        //MOSTRAR CARRITO Y BORRAR PRODUCTOS
        boton_carrito.onclick = () => {
            
            carrito = JSON.parse(localStorage.getItem('carrito'))
            total = JSON.parse(localStorage.getItem('total'))

            carrito_compras_html.innerHTML = ''
            if (carrito != null && carrito.length > 0) {

                carrito.map((producto) => {
                    carrito_compras_html.innerHTML += `
                        <div class="card_font d-flex text-center" style="width: 150px; height: auto; border:white" id="producto_carrito${producto.id}">
                            <img src="multimedia/producto${producto.id}.jpg" class="imagen_carrito me-5" alt="imagen_producto">
                                <div class="informacion_producto">
                                    <p>${producto.nombre} - <strong>${producto.marca}</strong> </p>
                                    <p class="precio">$${producto.precio} </p>
                                    <p>cantidad: ${producto.cantidad} </p>
                                        <div class="d-flex">
                                            <button type="button" class="btn btn-outline-secondary me-3" id="boton_bajar_cantidad${producto.id}">-</button>
                                            <button type="button" class="btn btn-outline-primary ms-2 me-3" id="boton_subir_cantidad${producto.id}">+</button>
                                            <button type="button" class="btn btn-outline-danger boton_borrar" id="boton_borrar_producto${producto.id}">Borrar producto<i class="fas fa-trash-alt ms-2"></i></button>
                                        </div>
                                </div>
                        </div>                
                    `
                })

                carrito_compras_html.innerHTML += `
                    <h3 class="mt-5">Total: $${total}</h3>
                    <h6>Salga y entre del carrito para ver el precio actual</h6>
                `
            }
            else {
                carrito_compras_html.innerHTML += `
                    <h4 class="d-flex justify-content-center mt-4">no hay productos</h4>
                `
            }


            //borrar productos del carrito
            carrito.map((producto) => {

                document.getElementById(`boton_borrar_producto${producto.id}`).onclick = () => {
                    event.preventDefault()

                    let index = carrito.findIndex(productoCarrito => productoCarrito.id == producto.id)
                    borrar_agregar_producto(producto.cantidad, producto, index)
                    
                    agregar_local_storage(carrito,total)

                    alert('Producto borrado correctamente!')
                }

            })


            //bajar cantidad producto
            carrito.map((producto) => {
                document.getElementById(`boton_bajar_cantidad${producto.id}`).onclick = () => {
                    event.preventDefault()

                    let index = carrito.findIndex(productoCarrito => productoCarrito.id == producto.id)
                    borrar_agregar_producto(1, producto, index)
                    
                    agregar_local_storage(carrito,total)

                    alert(`Producto borrado correctamente! Cantidad actual: ${producto.cantidad}`)
                }
            })


            //subir cantidad producto
            carrito.map((producto) => {
                document.getElementById(`boton_subir_cantidad${producto.id}`).onclick = () => {
                    event.preventDefault()

                    let index = carrito.findIndex(productoCarrito => productoCarrito.id == producto.id)
                    borrar_agregar_producto(-1, producto, index)
                    
                    agregar_local_storage(carrito,total)

                    alert(`Producto agregado correctamente! Cantidad actual: ${producto.cantidad}`)
                }
            })


            //funcion para borrar y agregar productos
            const borrar_agregar_producto = (cantidad, producto, index) => {
                total = total - producto.precio * cantidad

                if (producto.cantidad == 1 || producto.cantidad == cantidad)
                    carrito.splice(index, 1)

                producto.cantidad = producto.cantidad - cantidad
            }
        }


        //FINALIZA LA COMPRA
        boton_finalizar_compra_html.onclick = () => {
            
            
            swal.fire("Gracias por su compra!", `Precio final: $${total}`, "success")
            
            // carrito.map((producto) => {
            //     producto.cantidad = 0
            // })
            
            agregar_local_storage([],0)

        }

    })

    .catch(error => console.log(error))
