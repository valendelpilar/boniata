//agregar al carrito
let carrito = []
let total = 0
data.forEach((producto) => {
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











//borrar productos del carrito
carrito.forEach((producto) => {
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
carrito.forEach((producto) => {
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
carrito.forEach((producto) => {
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