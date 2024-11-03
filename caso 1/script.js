document.addEventListener("DOMContentLoaded", function() {
    let cart = JSON.parse(localStorage.getItem("cartItems")) || [];

    // Funcionalidad para añadir a la cesta
    function addToCart(event) {
        const gameName = event.target.closest('.game-card').querySelector('h3').textContent;
        cart.push(gameName);
        localStorage.setItem("cartItems", JSON.stringify(cart)); // Guardar la cesta en localStorage
        alert(`${gameName} ha sido añadido a la cesta.`);
    }

    // Funcionalidad para mostrar información del producto
    function showInfo(event) {
        const gameName = event.target.closest('.game-card').querySelector('h3').textContent;
        alert(`Información del juego: ${gameName}`);
    }

    // Añadir eventos a los botones de añadir a la cesta y de información
    function addEventListeners() {
        const addToCartButtons = document.querySelectorAll(".add-to-cart");
        addToCartButtons.forEach(button => {
            button.addEventListener("click", addToCart);
        });

        const infoButtons = document.querySelectorAll(".informacion-producto");
        infoButtons.forEach(button => {
            button.addEventListener("click", showInfo);
        });
    }

    // Redirigir a la página de cesta
    document.getElementById("cart-button").addEventListener("click", function() {
        window.location.href = "cesta.html"; // Redirige a la nueva página
    });

    // Llamar a la función para añadir eventos después de cargar los juegos
    addEventListeners();

    // Función para cargar los juegos y añadir los eventos
    async function loadGames() {
        try {
            const response = await fetch('/casoEstudio1/data');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const games = await response.json();
            console.log('casoEstudio1:', games); // Verifica que los datos se están obteniendo

            const gameList = document.getElementById('game-list');
            gameList.innerHTML = '';

            games.forEach(game => {
                const gameCard = document.createElement('div');
                gameCard.classList.add('game-card');

                const gameImage = document.createElement('img');
                gameImage.src = game.game_poster;
                gameImage.alt = game.game_name;

                const gameTitle = document.createElement('h3');
                gameTitle.textContent = game.game_name;

                const addToCartButton = document.createElement('button');
                addToCartButton.classList.add('add-to-cart');
                addToCartButton.textContent = 'Añadir a la Cesta';

                const infoButton = document.createElement('button');
                infoButton.classList.add('informacion-producto');
                infoButton.textContent = 'Info';

                gameCard.appendChild(gameImage);
                gameCard.appendChild(gameTitle);
                gameCard.appendChild(addToCartButton);
                gameCard.appendChild(infoButton);

                gameList.appendChild(gameCard);
            });

            // Añadir eventos a los botones de añadir a la cesta después de cargar los juegos
            addEventListeners();
        } catch (error) {
            console.error('Error loading games:', error);
        }
    }

    // Cargar los juegos al cargar la página
    loadGames();
});