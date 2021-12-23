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
                            <button type="button" class="btn" id="boton_carrito_producto${producto.id}">Agregar al carrito <i class="fas fa-shopping-basket"></i></button>            
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
                            <button type="button" class="btn" id="boton_carrito_producto${producto.id}">Agregar al carrito <i class="fas fa-shopping-basket"></i></button>
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
                carrito.push(producto)
                localStorage.setItem('carrito', JSON.stringify(carrito))
            })
        })

    })
    
    .catch(error => console.log(error))



    //MOSTRAR CARRITO
    let carrito_compras_html = document.getElementById('div_carrito_compras')
    document.getElementById('boton_carrito').addEventListener('click', () => {
        let productos_parseados = JSON.parse(localStorage.getItem('carrito'))
        carrito_compras_html.innerHTML = ''
        carrito_compras_html.innerHTML += `
            <h2 class="d-flex justify-content-center mt-4">CARRITO</h2>
        `
        if (productos_parseados != null) {
            productos_parseados.forEach((producto, indice) => {
                carrito_compras_html.innerHTML += `
                    <div class="card m-2" style="width: 170px; height: auto" id="producto_carrito${producto.id}">
                        <div class="card-body card_productos">
                            <p class="card-text nombre">${producto.nombre} - <strong>${producto.marca}</strong> </p>
                            <p class="card-text descripcion">${producto.descripcion} </p>
                            <p class="card-text precio">$${producto.precio} </p>
                            <button type="button" class="btn boton_borrar" id="boton_borrar_producto${producto.id}">Borrar producto <i class="fas fa-shopping-basket"></i></button>
                        </div>
                    </div>
                `
            })
        }
        else {
            carrito_compras_html.innerHTML += `
                <h4 class="d-flex justify-content-center mt-4">no hay productos</h4>
            `
            console.log('no hay productos')
        }
    })

