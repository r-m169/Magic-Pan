const displayCartItems = () => {
    const cartItems = JSON.parse(localStorage.getItem("cart"));
    const cartList = document.getElementById("cart-items");

    if (cartItems && cartItems.length > 0) {
        cartList.innerHTML = "";

        cartItems.forEach(item => {
            const cartItemDiv = document.createElement("div");
            cartItemDiv.id = `cart-item-${item.idMeal}`;
            cartItemDiv.classList.add("meals-details", "container-fluid", "d-flex", "justify-content-center", "align-items-center");
            cartItemDiv.innerHTML = `
                <div class="card mb-3" style="max-width: 540px;">
                    <div class="row g-0">
                        <div class="col-md-4">
                            <img src="${item.strMealThumb}" class="img-fluid rounded-start meal-pic" alt="...">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title" id="meal-title">${item.strMeal}</h5>
                                <p class="card-text strCategory" id="meal-category">${item.strCategory}</p>
                                <p class="card-text price" id="meal-price">$10</p>
                                <div class="quantity">
                                <button class="btn btn-sm btn-outline-secondary" onclick="decreaseQuantity(${item.idMeal})">-</button>
                                <span id="quantity-${item.idMeal}">1</span>
                                <button class="btn btn-sm btn-outline-secondary" onclick="increaseQuantity(${item.idMeal})">+</button>
                                </div>
                                <button class="btn btn-sm btn-outline-danger" onclick="removeItem(${item.idMeal})">Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            cartList.appendChild(cartItemDiv);
        });
    } else {
        cartList.innerHTML = "Your cart is empty.";
    }
};

const increaseQuantity = (itemId) => {
    const quantityElement = document.getElementById(`quantity-${itemId}`);
    let quantity = parseInt(quantityElement.textContent);
    quantity++;
    quantityElement.textContent = quantity;

    const priceElement = document.getElementById(`cart-item-${itemId}`).querySelector(".price");
    const price = 10; // Replace with the actual price of the item
    const totalPrice = price * quantity;
    priceElement.textContent = `$${totalPrice}`;
};

const decreaseQuantity = (itemId) => {
    const quantityElement = document.getElementById(`quantity-${itemId}`);
    let quantity = parseInt(quantityElement.textContent);
    if (quantity > 1) {
        quantity--;
        quantityElement.textContent = quantity;

        const priceElement = document.getElementById(`cart-item-${itemId}`).querySelector(".price");
        const price = 10; 
        const totalPrice = price * quantity;
        priceElement.textContent = `$${totalPrice}`;
    } else {
        removeItem(itemId);
    }
};

const removeItem = (itemId) => {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    const updatedCartItems = cartItems.filter(item => item.id !== itemId);
    localStorage.setItem("cart", JSON.stringify(updatedCartItems));

    const cartItem = document.getElementById(`cart-item-${itemId}`);
    if (cartItem) {
        cartItem.remove();
        localStorage.removeItem('cart')
    }

    const orderBadge = document.getElementById("order-badge");
    orderBadge.textContent = updatedCartItems.length;
};

displayCartItems();

const addToCart = async () => {
    const mealId = getMealParam("id");
    const currentMeal = await generateCurrentMeal(mealId);

    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

    const existingItem = cartItems.find(item => item.id === currentMeal.id);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        currentMeal.quantity = 1;
        cartItems.push(currentMeal);
    }

    localStorage.setItem("cart", JSON.stringify(cartItems));

    const orderBadge = document.getElementById("order-badge");
    orderBadge.textContent = cartItems.length;

    alert("Meal added to cart!");

    displayCartItems();
};
const checkout = () => {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
   
    clearCart();

    alert("Checkout successful!");
};

const clearCart = () => {
    localStorage.removeItem("cart");

    const cartList = document.getElementById("cart-items");
    cartList.innerHTML = "Your cart is empty.";

    const orderBadge = document.getElementById("order-badge");
    orderBadge.textContent = "0";
};

const checkoutButton = document.getElementById("checkout-button");
checkoutButton.addEventListener("click", checkout);

const clearCartButton = document.getElementById("clear-cart-button");
clearCartButton.addEventListener("click", clearCart);