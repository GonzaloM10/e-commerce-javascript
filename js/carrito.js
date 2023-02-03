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

  tieneProductos() {
    return this.elementoHtml.contains(
      document.querySelector(".producto-carrito")
    );
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
      // Agregar animacion a boton carrito
      if (!this.tieneProductos()) {
        let btnCarrito = document.querySelector(".btn-carrito");

        btnCarrito.classList.add("animacion-carrito");
      }

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
            <div class="suma-resta">
              <button class="suma-resta-item" id="btn-suma-producto-${objeto.marca}"><img src="svg/plus-square-fill.svg"></button>
              <p class="suma-resta-item"><img src="svg/plus-slash-minus.svg"></p>
              <button class="suma-resta-item" id="btn-resta-producto-${objeto.marca}"><img src="svg/dash-square-fill.svg"></button>
            </div>
            <button class="btn-trash-${objeto.marca} btn-trash"><img src="svg/trash.svg"></button>
          `;
      this.agregarElemento(productoCarrito);

      // Logica botones suma y resta

      let btnSumaProducto = document.getElementById(
        `btn-suma-producto-${objeto.marca}`
      );

      btnSumaProducto.addEventListener("click", () => {
        this.agregarDinero(objeto.precio);

        let spanCantidad = document.getElementById(
          `cantidad-producto-${objeto.marca}`
        );

        let cantidadActual = parseInt(spanCantidad.innerHTML);

        cantidadActual++;

        spanCantidad.innerHTML = cantidadActual;
      });

      let btnRestaProductos = document.getElementById(
        `btn-resta-producto-${objeto.marca}`
      );

      btnRestaProductos.addEventListener("click", () => {
        if (this.precioTotal <= 0) {
          return 0;
        }

        this.restarDinero(objeto.precio);

        let spanCantidad = document.getElementById(
          `cantidad-producto-${objeto.marca}`
        );
        let cantidadActual = parseInt(spanCantidad.innerHTML);

        cantidadActual--;

        spanCantidad.innerHTML = cantidadActual;
      });

      // Boton eliminar Producto
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

        // Eliminar animacion de boton carrito
        if (!this.tieneProductos()) {
          let btnCarrito = document.querySelector(".btn-carrito");

          btnCarrito.classList.remove("animacion-carrito");
        }
      });
    }
  }
}
