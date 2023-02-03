const root = document.getElementById("root");

//Barra de navegacion

const nav = new Interfaz({
  elementoHtml: document.createElement("nav"),
  id: "nav",
});

const logo = `<img src="svg/bag-check-fill.svg" class="logo"/>`;
const barraBusqueda = `<input placeholder="Buscar" id="barra-busqueda" />`;
const btnCarrito = `<button class="btn-carrito"><img src="svg/cart4.svg"></button>`;

nav.agregarInnerHtml(logo);
nav.agregarInnerHtml(barraBusqueda);
nav.agregarInnerHtml(btnCarrito);

root.append(nav.elementoHtml);

// CARRITO DE COMPRAS

let carritoPopUp = new InterfazCarrito({
  elementoHtml: document.createElement("dialog"),
  id: "dialog",
});

carritoPopUp.agregarInnerHtml(`
    <form method="dialog" id="carrito-form">
      <button value="cancel" class="btn-cerrar-modal"><img src="svg/x-square.svg" class="img-cerrar-modal"/></button>
      <div class="productos"></div>
      <p id="precio-total">Total a pagar: <span class="span-precio-total">0</span> AR$</p>
      
    </form>
`);

root.append(carritoPopUp.elementoHtml);

const btnCarritoPopUp = document.querySelector(".btn-carrito");
const dialog = document.getElementById("dialog");

btnCarritoPopUp.addEventListener("click", () => dialog.showModal());

// INTERFAZ DE FILTROS
const interfazFiltros = new Interfaz({
  elementoHtml: document.createElement("div"),
  id: "interfazFiltros",
});

const filtros = `
<form class="filtros">
    <select>
        <option>Ordenar</option>
        <option>A-Z</option>
        <option>Z-A</option>
        <option>Precio: Mayor a menor</option>
        <option>Precio: Menor a mayor</option>
    </select>
    <div class="marcas">
        <p>Filtrar por marcas</p>
        <label for="asus">
            Asus
            <input type="checkbox" id="asus" />
        </label>
        <label for="nvidia">
            Nvidia
            <input type="checkbox" id="nvidia" />
        </label>
        <label for="logitech">
            Logitech
            <input type="checkbox" id="logitech" />
        </label>
        <label for="deepcool">
            Deepcool
            <input type="checkbox" id="deepcool" />
        </label>
    </div>

    <button id="btn-filtros" type="submit">Aplicar</button>
</form>
`;

interfazFiltros.agregarInnerHtml(filtros);

// PRODUCTOS O STOCK

const productos = [
  {
    img: "img/asus.png",
    titulo: "Asus",
    marca: "asus",
    precio: 80000,
    cantidad: 1,
  },
  {
    img: "img/deepcool.jpg",
    titulo: "Deepcool",
    marca: "deepcool",
    precio: 40000,
    cantidad: 1,
  },
  {
    img: "img/logitech.jpg",
    titulo: "Logitech",
    marca: "logitech",
    precio: 60000,
    cantidad: 1,
  },
  {
    img: "img/nvidia.png",
    titulo: "Nvidia",
    marca: "nvidia",
    precio: 70000,
    cantidad: 1,
  },
  {
    img: "img/asus.png",
    titulo: "Asus",
    marca: "asus",
    precio: 80000,
    cantidad: 1,
  },
  {
    img: "img/deepcool.jpg",
    titulo: "Deepcool",
    marca: "deepcool",
    precio: 40000,
    cantidad: 1,
  },
  {
    img: "img/logitech.jpg",
    titulo: "Logitech",
    marca: "logitech",
    precio: 60000,
    cantidad: 1,
  },
  {
    img: "img/nvidia.png",
    titulo: "Nvidia",
    marca: "nvidia",
    precio: 70000,
    cantidad: 1,
  },
];

const interfazProductos = new InterfazProductos({
  elementoHtml: document.createElement("div"),
  id: "interfazProductos",
});

interfazProductos.agregarAlDom(root);
interfazProductos.agregarListaProductos(productos);

//FOOTER

const footer = document.createElement("footer");
footer.id = "footer";
footer.innerHTML = `
  <img src="svg/bag-check-fill.svg" alt="logo" />
  <p>E-Commerce</p>
`;

root.append(interfazFiltros.elementoHtml);
root.append(footer);

// Logica de busqueda de productos

const inputBusqueda = document.getElementById("barra-busqueda");

inputBusqueda.addEventListener("input", () => {
  //Minimo 3 caracteres para empezar la busqueda
  if (inputBusqueda.value.length >= 3) {
    let productosFiltrados = productos.filter((prod) =>
      prod.marca.includes(inputBusqueda.value)
    );

    if (productosFiltrados.length > 0) {
      interfazProductos.limpiarProductos();

      interfazProductos.agregarListaProductos(productosFiltrados);
    }
  }

  if (inputBusqueda.value === "") {
    interfazProductos.limpiarProductos();

    interfazProductos.agregarListaProductos(productos);
  }
});
