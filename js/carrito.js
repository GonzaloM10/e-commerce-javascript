class InterfazCarrito extends Interfaz {
  precioTotal = 0;

  agregarDinero(dinero) {
    this.precioTotal += dinero;

    let spanPrecioTotal = document.querySelector(".span-precio-total");

    spanPrecioTotal.innerHTML = this.precioTotal;
  }

  restarDinero(dinero) {
    this.precioTotal -= dinero;
    let spanPrecioTotal = document.querySelector(".span-precio-total");
    spanPrecioTotal.innerHTML = this.precioTotal;
  }

  crearProducto(objeto) {
    this.agregarDinero(objeto.precio);
    let productoCarrito = document.createElement("div");

    if (
      this.elementoHtml.contains(document.getElementById(`${objeto.marca}`))
    ) {
      let cantidadProducto = document.getElementById(
        `cantidad-producto-${objeto.marca}`
      );

      cantidadProducto.innerHTML = `${
        parseInt(cantidadProducto.innerHTML) + objeto.cantidad
      }`;
    } else {
      productoCarrito.id = `${objeto.marca}`;
      productoCarrito.classList = `producto-carrito`;
      productoCarrito.innerHTML = `
            <div class="info-producto-carrito">
              <img src="${objeto.img}" class="img-producto-carrito"/>
              <div id="info-producto-${objeto.marca}">
                <p>Producto: ${objeto.titulo}</p>
                <p>Precio: ${objeto.precio}</p>
                <p>Cantidad: <span id="cantidad-producto-${objeto.marca}">${objeto.cantidad}</span></p>
              </div>
            </div>
  
            <button class="btn-trash-${objeto.marca}"><img src="svg/trash.svg"></button>
          `;
    }

    this.agregarElemento(productoCarrito);

    let btnEliminarProducto = document.querySelector(
      `.btn-trash-${objeto.marca}`
    );

    btnEliminarProducto.addEventListener("click", () => {
      let cantidadProducto = parseInt(
        document.getElementById(`cantidad-producto-${objeto.marca}`).innerHTML
      );

      this.restarDinero(objeto.precio * cantidadProducto);

      let divPadreBoton = document.getElementById(`${objeto.marca}`);
      divPadreBoton.remove();
    });
  }
}
