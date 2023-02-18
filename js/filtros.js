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
        arrOrdenado = ordernarNombre(productosFiltrados, "A-Z");

        copiaProductos = ordernarNombre(copiaProductos, "A-Z");

        break;
      case "Z-A":
        arrOrdenado = ordernarNombre(productosFiltrados, "Z-A");

        copiaProductos = ordernarNombre(copiaProductos, "Z-A");
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
