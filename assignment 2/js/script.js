// In a real application, this is where you would fetch product data from an API
// For simplicity, we'll use mock data

const products = [
    { name: "Product 1", price: 19.99, image: "product1.jpg" },
    { name: "Product 2", price: 29.99, image: "product2.jpg" },
    { name: "Product 3", price: 39.99, image: "product3.jpg" },
    { name: "Product 4", price: 49.99, image: "product4.jpg" }
];

document.addEventListener('DOMContentLoaded', function () {
    const productsContainer = document.querySelector('.products');

    // Generate product cards
    products.forEach(product => {
        const card = document.createElement('div');
        card.classList.add('product-card');
        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>$${product.price.toFixed(2)}</p>
            <a href="#" class="btn">Add to Cart</a>
        `;
        productsContainer.appendChild(card);
    });
});
