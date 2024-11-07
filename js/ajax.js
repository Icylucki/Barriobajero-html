// ajax.js
const cargarProductos = () => {
  return fetch('../data/productos.json')
    .then(response => response.json())
    .then(data => {
      return data; // Devuelve los datos cargados del JSON
    })
    .catch(error => console.error('Error al cargar los productos:', error));
};

