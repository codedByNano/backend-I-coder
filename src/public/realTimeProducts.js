const socket = io();

socket.on("connect", () => {
  console.log(`Conectado al servidor con ID: ${socket.id}`);
});

function renderProducts(products) {
  const productsContainer = document.getElementById("productsContainer");
  productsContainer.innerHTML = products
    .map(
      (product) =>
        `<div class="productCard">
      <h2>${product.title}</h2>
      <p><strong>ID:</strong> ${product.id}</p>
      <p><strong>Descripción:</strong> ${product.description}</p>
      <p><strong>Código:</strong> ${product.code}</p>
      <p><strong>Precio:</strong> $${product.price}</p>
      <p><strong>Estado:</strong> ${
        product.status ? "Disponible" : "No disponible"
      }</p>
      <p><strong>Stock:</strong> ${product.stock}</p>
      <p><strong>Categoría:</strong> ${product.category}</p>
    </div>`
    )
    .join("");
}

socket.on("ProductUpdate", (products) => {
  renderProducts(products);
});

const addProductForm = document.getElementById("addProductForm");
addProductForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const newProduct = {
    title: document.getElementById("title").value,
    description: document.getElementById("description").value,
    code: document.getElementById("code").value,
    price: parseFloat(document.getElementById("price").value),
    stock: parseInt(document.getElementById("stock").value),
    category: document.getElementById("category").value,
  };
  socket.emit("addProduct", newProduct, (req, res) => {
    if (res.error) {
      alert(res.error);
    } else {
      addProductForm.reset();
    }
  });
});

socket.on("addProduct", (product) => {
  alert(`Producto agregado: ${product.title}`);
});

const editProductForm = document.getElementById("editProductForm");
editProductForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const id = parseInt(document.getElementById("editId").value);
  const updatedProduct = {
    id: id,
    title: document.getElementById("editTitle").value,
    description: document.getElementById("editDescription").value,
    price: parseFloat(document.getElementById("editPrice").value),
    stock: parseInt(document.getElementById("editStock").value),
    category: document.getElementById("editCategory").value,
  };
  socket.emit("editProduct", updatedProduct, (req, res) => {
    if (res.error) {
      alert(res.error);
    } else {
      editProductForm.reset();
    }
  });
});

socket.on("productEdited", (product) => {
  alert(`Producto editado: ${product.title}`);
});

const deleteProductForm = document.getElementById("deleteProductForm");
deleteProductForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const id = parseInt(document.getElementById("deleteId").value);
  socket.emit("deleteProduct", id, (req, res) => {
    if (res.error) {
      alert(res.error);
    } else {
      deleteProductForm.reset();
    }
  });
});

socket.on("productDeleted", () => {
  alert(`Producto eliminado`);
});

