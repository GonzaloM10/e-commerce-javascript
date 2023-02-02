class InterfazProductos extends Interfaz {
  agregarAlDom(elemento) {
    elemento.append(this.elementoHtml);
  }

  agregarListaProductos(arrObj) {
    arrObj.forEach((obj, i) => {
      let div = document.createElement("div");
      div.classList = "card";

      div.innerHTML = `<img src="${obj.img}">
                       <div class="descripcion">
                          <p>${obj.titulo}</p>
                          <p>Precio: ${obj.precio}</p>
                       </div>
                       <button class="btn-card-${i} btn-card">Agregar al Carrito <img src="svg/cart-plus-fill.svg"></button>
                       `;

      this.elementoHtml.append(div);

      let btnCard = document.querySelector(`.btn-card-${i}`);

      btnCard.addEventListener("click", () => {
        carritoPopUp.crearProducto(obj);
      });
    });
  }

  limpiarProductos() {
    let productos = document.querySelectorAll(".card");
    productos.forEach((prod) => {
      prod.remove();
    });
  }
}
