// Logica de filtrado y ordenado de productos

const formFiltros = document.querySelector(".filtros");

formFiltros.addEventListener("submit", (e) => {
  e.preventDefault();
  interfazProductos.limpiarProductos();

  const filter = (id) => {
    return productos.filter((prod) => prod.marca === id);
  };

  let productosFiltrados = [];

  //Filtrado por checkboxes
  for (const target of e.target) {
    if (target.type === "checkbox") {
      if (target.checked) {
        let products = filter(target.id);
        productosFiltrados = [...productosFiltrados, ...products];
      }
    }
  }

  // Ordenado por select
  let copiaProductos = [...productos];
  let arrOrdenado;

  if (e.target[0].value !== "Ordenar") {
    switch (e.target[0].value) {
      case "A-Z":
        arrOrdenado = productosFiltrados.sort((a, b) => {
          const nombreA = a.titulo.toLocaleLowerCase();
          const nombreB = b.titulo.toLocaleLowerCase();

          if (nombreA < nombreB) {
            return -1;
          }

          if (nombreA > nombreB) {
            return 1;
          }

          return 0;
        });

        copiaProductos = copiaProductos.sort((a, b) => {
          const nombreA = a.titulo.toLocaleLowerCase();
          const nombreB = b.titulo.toLocaleLowerCase();

          if (nombreA < nombreB) {
            return -1;
          }

          if (nombreA > nombreB) {
            return 1;
          }

          return 0;
        });

        break;
      case "Z-A":
        arrOrdenado = productosFiltrados.sort((a, b) => {
          const nombreA = a.titulo.toLocaleLowerCase();
          const nombreB = b.titulo.toLocaleLowerCase();

          if (nombreA > nombreB) {
            return -1;
          }

          if (nombreA < nombreB) {
            return 1;
          }

          return 0;
        });

        copiaProductos = copiaProductos.sort((a, b) => {
          const nombreA = a.titulo.toLocaleLowerCase();
          const nombreB = b.titulo.toLocaleLowerCase();

          if (nombreA > nombreB) {
            return -1;
          }

          if (nombreA < nombreB) {
            return 1;
          }

          return 0;
        });

        break;

      case "Precio: Mayor a menor":
        arrOrdenado = productosFiltrados.sort((a, b) => {
          return b.precio - a.precio;
        });

        copiaProductos = copiaProductos.sort((a, b) => {
          return b.precio - a.precio;
        });

        break;
      case "Precio: Menor a mayor":
        arrOrdenado = productosFiltrados.sort((a, b) => {
          return a.precio - b.precio;
        });

        copiaProductos = copiaProductos.sort((a, b) => {
          return a.precio - b.precio;
        });

        break;

      default:
        break;
    }
  }

  productosFiltrados.length === 0
    ? interfazProductos.agregarListaProductos(copiaProductos)
    : interfazProductos.agregarListaProductos(productosFiltrados);
});
