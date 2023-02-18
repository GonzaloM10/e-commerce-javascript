function eliminarAnimacion(elemento, claseAnimacion) {
  elemento.classList.remove(claseAnimacion);
}

function toastConfirmacion() {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-start",
    background: "#7CEA9C",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  Toast.fire({
    icon: "success",
    title: "Producto eliminado correctamente!",
  });
}

function ordernarNombre(arr, orden) {
  if (orden === "A-Z") {
    arr.sort((a, b) => {
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
  } else if (orden === "Z-A") {
    arr.sort((a, b) => {
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
  }

  return arr;
}
