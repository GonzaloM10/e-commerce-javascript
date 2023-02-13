class InterfazCarrito extends Interfaz {
  precioTotal = 0;

  productosEnElCarrito = JSON.parse(localStorage.getItem("carrito")) || [];

  cargaProductosLS() {
    this.productosEnElCarrito.forEach((prod) => {
      let spanPrecioTotal = document.querySelector(".span-precio-total");
      this.precioTotal += prod.precio * prod.cantidad - prod.precio;
      console.log(this.precioTotal);
      spanPrecioTotal.innerHTML = this.precioTotal;
      this.crearProducto(prod);
    });
  }

  actualizarLocalStorage(producto, operacion) {
    let productoEncotrado = this.productosEnElCarrito.find((prod) => {
      return producto.titulo === prod.titulo;
    });
    switch (operacion) {
      case "+":
        productoEncotrado.cantidad++;
        break;
      case "-":
        if (productoEncotrado.cantidad === 1) {
          break;
        }
        productoEncotrado.cantidad--;
        break;
      default:
        break;
    }
    localStorage.setItem("carrito", JSON.stringify(this.productosEnElCarrito));
  }

  agregarProductoLocalStorage(producto) {
    this.productosEnElCarrito.push(producto);
    localStorage.setItem("carrito", JSON.stringify(this.productosEnElCarrito));
  }

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
    //Si el producto ya esta en el carrito, se suma la cantidad y su precio al total

    let productoCarrito = document.createElement("div");
    if (
      this.elementoHtml.contains(document.getElementById(`${objeto.marca}`))
    ) {
      let cantidadProducto = document.getElementById(
        `cantidad-producto-${objeto.marca}`
      );
      let cantidadActual = parseInt(cantidadProducto.innerHTML);
      cantidadProducto.innerHTML = cantidadActual + 1;

      this.actualizarLocalStorage(objeto, "+");
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

      //Agregar productos del carrito al LocalStorage
      let productoRepetidoEnLocalStorage = this.productosEnElCarrito.find(
        (prod) => prod.titulo === objeto.titulo
      );
      if (!productoRepetidoEnLocalStorage) {
        this.agregarProductoLocalStorage(objeto);
      }

      // Logica botones suma y resta

      let btnSumaProducto = document.getElementById(
        `btn-suma-producto-${objeto.marca}`
      );

      btnSumaProducto.addEventListener("click", () => {
        this.agregarDinero(objeto.precio);
        this.actualizarLocalStorage(objeto, "+");

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
        // if (this.precioTotal <= 0) {
        //   return 0;
        // }

        let spanCantidad = document.getElementById(
          `cantidad-producto-${objeto.marca}`
        );
        let cantidadActual = parseInt(spanCantidad.innerHTML);

        if (cantidadActual === 1) {
          this.elementoHtml.close();
          Swal.fire({
            title: "Estás seguro?",
            text: "Si restas uno más el producto se eliminará del carrito!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText: "Cancelar",
            confirmButtonText: "Estoy seguro",
          }).then((result) => {
            if (result.isConfirmed) {
              this.restarDinero(objeto.precio);
              this.actualizarLocalStorage(objeto, "-");

              let divPadre = document.getElementById(`${objeto.marca}`);
              divPadre.remove();

              // Eliminar producto del LocalStorage

              let productoEnLocalStorage = this.productosEnElCarrito.find(
                (el) => el.titulo === objeto.titulo
              );
              console.log(productoEnLocalStorage);
              let indice = this.productosEnElCarrito.indexOf(
                productoEnLocalStorage
              );
              this.productosEnElCarrito.splice(indice, 1);
              localStorage.setItem(
                "carrito",
                JSON.stringify(this.productosEnElCarrito)
              );

              !this.tieneProductos() &&
                eliminarAnimacion(
                  document.querySelector(".btn-carrito"),
                  "animacion-carrito"
                );

              Swal.fire(
                "Eliminado!",
                "El producto ha sido eliminado",
                "success"
              );
            }
          });

          return 0;
        }

        this.restarDinero(objeto.precio);
        this.actualizarLocalStorage(objeto, "-");

        cantidadActual--;

        spanCantidad.innerHTML = cantidadActual;
      });

      // Boton eliminar Producto
      let btnEliminarProducto = document.querySelector(
        `.btn-trash-${objeto.marca}`
      );

      btnEliminarProducto.addEventListener("click", () => {
        this.elementoHtml.close();
        Swal.fire({
          title: "Estás seguro?",
          text: "Podrás volver a agregar el producto en cualquier momento!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Estoy seguro!",
          cancelButtonText: "Cancelar",
        }).then((result) => {
          if (result.isConfirmed) {
            // Eliminar producto del LocalStorage
            let productoEnLocalStorage = this.productosEnElCarrito.find(
              (el) => el.titulo === objeto.titulo
            );
            let indice = this.productosEnElCarrito.indexOf(
              productoEnLocalStorage
            );
            this.productosEnElCarrito.splice(indice, 1);
            localStorage.setItem(
              "carrito",
              JSON.stringify(this.productosEnElCarrito)
            );

            let cantidadProducto = parseInt(
              document.getElementById(`cantidad-producto-${objeto.marca}`)
                .innerHTML
            );
            this.restarDinero(objeto.precio * cantidadProducto);

            let divPadreBoton = document.getElementById(`${objeto.marca}`);
            divPadreBoton.remove();

            !this.tieneProductos() &&
              eliminarAnimacion(
                document.querySelector(".btn-carrito"),
                "animacion-carrito"
              );

            Swal.fire("Eliminado!", "El producto ha sido eliminado", "success");
          }
        });
      });
    }
  }
}
