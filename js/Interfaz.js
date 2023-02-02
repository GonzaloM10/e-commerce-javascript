class Interfaz {
  constructor({ elementoHtml, id }) {
    this.elementoHtml = elementoHtml;
    this.elementoHtml.id = id;
  }

  agregarElemento(elemento) {
    this.elementoHtml.append(elemento);
  }

  agregarInnerHtml(texto) {
    this.elementoHtml.innerHTML += texto;
  }
}
