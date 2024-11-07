// app.js

// Espera a que el DOM esté listo para ejecutar el script
document.addEventListener('DOMContentLoaded', function () {
    // Carga los productos
    cargarProductos().then(data => {
      // Guardar los datos globalmente
      window.productosData = data;
  
      // Inicializar el filtro (muestra todos los productos por defecto)
      aplicarFiltros();
  
      // Escucha el cambio en la categoría
      document.querySelector('#categoria').addEventListener('change', aplicarFiltros);
    });
  });
  
  // Función para aplicar filtros por categoría
  const aplicarFiltros = () => {
    // Obtener la categoría seleccionada
    const categoriaSeleccionada = document.querySelector('#categoria').value;
  
    let productosFiltrados = [];
  
    // Filtrar productos por categoría seleccionada
    if (categoriaSeleccionada === '' || categoriaSeleccionada === 'Pantalones') {
      productosFiltrados = productosFiltrados.concat(window.productosData.pantalones);
    }
    if (categoriaSeleccionada === '' || categoriaSeleccionada === 'Abrigos') {
      productosFiltrados = productosFiltrados.concat(window.productosData.camperas);
    }
  
    // Mostrar productos filtrados o un mensaje de no encontrados
    const contenedorProductos = document.querySelector('#productos');
    contenedorProductos.innerHTML = ''; // Limpiar productos previos
  
    if (productosFiltrados.length > 0) {
      renderProductos(productosFiltrados, contenedorProductos);
    } else {
      contenedorProductos.innerHTML = '<p>No se encontraron productos para esta selección. ;(</p>';
    }
  };
  
  // Función para renderizar los productos en el DOM
  const renderProductos = (productos, contenedor) => {
    productos.forEach(producto => {
      if (producto.disponible) { // Solo mostrar productos disponibles
        // Crear contenedor del producto
        const productoDiv = document.createElement('div');
        productoDiv.classList.add('producto');
  
        const linkProducto = document.createElement('a');
        linkProducto.href = producto.url;
  
        // Crear y agregar imagen del producto
        const imagenProducto = document.createElement('img');
        imagenProducto.src = producto.img;
        imagenProducto.alt = producto.titulo;
        productoDiv.appendChild(imagenProducto);
  
        linkProducto.appendChild(imagenProducto);
        productoDiv.appendChild(linkProducto);
  
        // Crear y agregar título
        const tituloProducto = document.createElement('h3');
        tituloProducto.textContent = producto.titulo;
        productoDiv.appendChild(tituloProducto);
  
        // Crear y agregar precio
        const precioProducto = document.createElement('h4');
        precioProducto.textContent = `$${producto.precio}`;
        productoDiv.appendChild(precioProducto);
  
        // Agregar producto al contenedor
        contenedor.appendChild(productoDiv);
      }
    });
  };
  