const socket = io();

function renderProducts(products) {
  const productsContainer = document.getElementById('productsContainer');
  productsContainer.innerHTML = products.map(product => `
    <div class="productCard">
      <h2>${product.title}</h2>
      <p><strong>ID:</strong> ${product.id}</p>
      <p><strong>Descripción:</strong> ${product.description}</p>
      <p><strong>Código:</strong> ${product.code}</p>
      <p><strong>Precio:</strong> $${product.price}</p>
      <p><strong>Estado:</strong> ${product.status ? 'Disponible' : 'No disponible'}</p>
      <p><strong>Stock:</strong> ${product.stock}</p>
      <p><strong>Categoría:</strong> ${product.category}</p>
    </div>
  `).join('');
}

socket.on('ProductUpdate', (products) => {
  renderProducts(products);
});

const addProductForm = document.getElementById('addProductForm');
addProductForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const newProduct = {
    title: document.getElementById('title').value,
    description: document.getElementById('description').value,
    code: document.getElementById('code').value,
    price: parseFloat(document.getElementById('price').value),
    stock: parseInt(document.getElementById('stock').value),
    category: document.getElementById('category').value,
  };
  socket.emit('addProduct', newProduct);
  addProductForm.reset();
});

const editProductForm = document.getElementById('editProductForm');
editProductForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const editedProduct = {
    id: parseInt(document.getElementById('editId').value),
    title: document.getElementById('editTitle').value,
    description: document.getElementById('editDescription').value,
    code: document.getElementById('editCode').value,
    price: parseFloat(document.getElementById('editPrice').value),
    stock: parseInt(document.getElementById('editStock').value),
    category: document.getElementById('editCategory').value,
  };
  socket.emit('editProduct', editedProduct);
  editProductForm.reset();
});

const deleteProductForm = document.getElementById('deleteProductForm');
deleteProductForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const id = parseInt(document.getElementById('deleteId').value);
  socket.emit('deleteProduct', id);
  deleteProductForm.reset();
});