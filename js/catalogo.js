// archivo: catalogo.js

document.addEventListener('DOMContentLoaded', () => {
    cargarProductos().then(data => {
      // Llamar a la función que mostrará los productos
      mostrarProductos(data);
    }).catch(error => {
      console.error('Error al cargar los productos:', error);
    });
  });
  
  // Función que carga los productos desde el JSON
  function cargarProductos() {
    return fetch('../data/productos.json')
      .then(response => response.json())
      .then(data => data)  // Devuelve los productos cargados
      .catch(error => console.error('Error al cargar los productos:', error));
  }
  
  // Función para mostrar los productos en la página
  function mostrarProductos(data) {
    const mainContent = document.querySelector('main');  // El contenedor donde se mostrarán los productos
    
    // Dividir productos en dos categorías: camperas y pantalones
    const categorias = ['camperas', 'pantalones'];
  
    categorias.forEach(categoria => {
      // Crear una sección para cada categoría
      const section = document.createElement('section');
      section.classList.add(categoria);
  
      // Crear el título de la categoría
      const titulo = document.createElement('h2');
      titulo.textContent = categoria.charAt(0).toUpperCase() + categoria.slice(1);  // Capitaliza la primera letra
      section.appendChild(titulo);
  
      // Crear el contenedor para los productos de esta categoría
      const contenedorProductos = document.createElement('div');
      contenedorProductos.classList.add('contenedor-productos');
      
      // Iterar sobre los productos de la categoría y agregarlos al contenedor
      data[categoria].forEach(producto => {
        if (producto.disponible) {
          const productoDiv = document.createElement('div');
          productoDiv.classList.add('producto');
          
          // Crear el enlace al producto
          const link = document.createElement('a');
          link.href = producto.url;
  
          // Crear la imagen del producto
          const img = document.createElement('img');
          img.src = producto.img;
          img.alt = producto.titulo;
  
          // Crear el título del producto
          const tituloProducto = document.createElement('h3');
          tituloProducto.textContent = producto.titulo;
  
          // Crear el precio del producto
          const precioProducto = document.createElement('p');
          precioProducto.textContent = `$${producto.precio}`;
  
          // Agregar los elementos dentro del div del producto
          link.appendChild(img);
          productoDiv.appendChild(link);
          productoDiv.appendChild(tituloProducto);
          productoDiv.appendChild(precioProducto);
  
          // Agregar el div del producto al contenedor
          contenedorProductos.appendChild(productoDiv);
        }
      });
  
      // Agregar el contenedor de productos a la sección
      section.appendChild(contenedorProductos);
  
      // Agregar la sección al contenido principal
      mainContent.appendChild(section);
    });
  }
  
