document.addEventListener("DOMContentLoaded", function() {
    let cart = JSON.parse(localStorage.getItem("cartItems")) || [];

    // Función para cargar los artículos de la cesta
    async function loadCartItems() {
        const cartList = document.getElementById('cart-list');
        cartList.innerHTML = '';

        for (const gameName of cart) {
            try {
                const response = await fetch(`/api/game-info?gameName=${gameName}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                if (!response.ok) {
                    throw new Error('No se pudo obtener la información del juego');
                }
                const gameInfo = await response.json();
                const listItem = document.createElement('li');
                listItem.classList.add('cart-item');
                listItem.innerHTML = `
                    <div class="cart-item-content">
                        <img src="${gameInfo.game_poster}" alt="${gameInfo.game_name}" class="cart-item-image" />
                        <div class="cart-item-details">
                            <h3 class="cart-item-title">${gameInfo.game_name}</h3>
                            <p class="cart-item-price">$${parseFloat(gameInfo.game_cost).toFixed(2)}</p>
                        </div>
                        <button class="remove-item-button">Eliminar</button>
                    </div>
                `;
                listItem.querySelector('.remove-item-button').addEventListener('click', () => {
                    removeFromCart(gameName);
                });
                cartList.appendChild(listItem);
            } catch (error) {
                console.error('Error cargando la información del juego:', error);
            }
        }
    }

    // Función para eliminar un juego de la cesta
    function removeFromCart(gameName) {
        cart = cart.filter(item => item !== gameName);
        localStorage.setItem('cartItems', JSON.stringify(cart));
        loadCartItems();
    }

    // Funcionalidad para proceder al pago
    async function proceedToPayment() {
        const keyOwner = localStorage.getItem('userName'); // Obtener el nombre del usuario actual
        for (const gameName of cart) {
            try {
                const response = await fetch('/proceed-to-payment', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}` // Suponiendo que el token de autenticación se guarda en localStorage
                    },
                    body: JSON.stringify({ gameName })
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                console.log('Payment processed:', result);
            } catch (error) {
                console.error('Error processing payment:', error);
            }
        }
        alert('Pago procesado con éxito.');
        cart = [];
        localStorage.removeItem("cartItems");
        loadCartItems(); // Actualizar la lista de la cesta
    }

    // Añadir evento al botón de proceder al pago
    document.getElementById("checkout-button").addEventListener("click", proceedToPayment);

    // Cargar los artículos de la cesta al cargar la página
    loadCartItems();
});