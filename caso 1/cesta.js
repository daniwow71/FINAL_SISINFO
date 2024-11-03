document.addEventListener("DOMContentLoaded", function() {
    let cart = JSON.parse(localStorage.getItem("cartItems")) || [];

    // Función para cargar los artículos de la cesta
    function loadCartItems() {
        const cartList = document.getElementById('cart-list');
        cartList.innerHTML = '';

        cart.forEach(gameName => {
            const listItem = document.createElement('li');
            listItem.textContent = gameName;
            cartList.appendChild(listItem);
        });
    }

    // Funcionalidad para proceder al pago
    async function proceedToPayment() {
        const keyOwner = "usuario"; // Reemplaza esto con el nombre del usuario actual
        for (const gameName of cart) {
            try {
                const response = await fetch('/proceed-to-payment', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ gameName, keyOwner })
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