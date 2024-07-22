const socket = io();


socket.on("ProductUpdate", (products) => {
  const productList = document.getElementById("product-list");
  productList.innerHTML = "";
  products.forEach((product) => {
    const li = document.createElement("li");
    li.textContent = `${product.title} - ${product.price}`;
    productList.appendChild(li);
  });
});
document.getElementById("product-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const code = document.getElementById("code").value;
  const price = document.getElementById("price").value;
  const stock = document.getElementById("stock").value;
  const category = document.getElementById("category").value;
  socket.emit("newProduct", {
    title,
    description,
    code,
    price,
    stock,
    category,
  });
  e.target.reset();
});
