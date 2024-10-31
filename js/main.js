let cart = [];

// Функция для отображения товара
function getProductHtml(product) {
    const priceInUAH = product.price.toFixed(2);

    return `
        <div class="col-md-4 mb-4">
            <div class="card h-100">
                <img src="${product.image}" class="card-img-top" alt="${product.title}">
                <div class="card-body">
                    <h5 class="card-title">${product.title}</h5>
                    <p class="card-text">${product.description}</p>
                    <p class="text-muted font-weight-bold">${priceInUAH} ₴</p>
                    <button class="btn btn-primary btn-block add-to-cart" data-title="${product.title}" data-price="${priceInUAH}">Добавить в корзину</button>
                </div>
            </div>
        </div>
    `;
}

// Обновление корзины
function updateCart() {
    const cartItems = document.querySelector('.cart-items');
    const cartTotal = document.querySelector('.cart-total');
    cartItems.innerHTML = '';

    let total = 0;
    cart.forEach(item => {
        cartItems.innerHTML += `<li>${item.title} - ${item.price} ₴</li>`;
        total += parseFloat(item.price);
    });
    cartTotal.textContent = total.toFixed(2);
}

// Добавление товара в корзину
function addToCart(title, price) {
    cart.push({ title, price });
    updateCart();
}

// Получение данных о товарах
async function getProducts() {
    const response = await fetch('products.json');
    const data = await response.json();
    return data;
}

getProducts().then(function(products) {
    let productsList = document.querySelector('.products-list');
    if(productsList) {
        products.forEach(product => {
            productsList.innerHTML += getProductHtml(product);
        });

        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', function() {
                const title = this.dataset.title;
                const price = this.dataset.price;
                addToCart(title, price);
            });
        });
    }
});

// Обработка формы заказа
document.getElementById('checkout-form').addEventListener('submit', function(e) {
    e.preventDefault();

    // Считываем данные формы
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;

    // Показать сообщение об успешной покупке
    alert(`Спасибо за покупку, ${name}! Заказ отправлен на ${address}.`);

    // Очищаем корзину и обновляем интерфейс
    cart = [];
    updateCart();

    // Сбрасываем форму
    e.target.reset();
});
