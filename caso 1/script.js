document.addEventListener("DOMContentLoaded", function() {
    let cart = JSON.parse(localStorage.getItem("cartItems")) || [];
    let games = [];

    // Funcionalidad para añadir a la cesta
    function addToCart(event) {
        const gameName = event.target.closest('.game-card').querySelector('h3').textContent;
        cart.push(gameName);
        localStorage.setItem("cartItems", JSON.stringify(cart)); // Guardar la cesta en localStorage
        alert(`${gameName} ha sido añadido a la cesta.`);
    }

    // Funcionalidad para mostrar información del producto
    function showInfo(event) {
        const gameCard = event.target.closest('.game-card');
        const gameName = gameCard.querySelector('h3').textContent;
        const gameImageSrc = gameCard.querySelector('img').src;
        const gameDescription = gameCard.getAttribute('data-description');
        const gameRate = gameCard.getAttribute('data-rate');
        const gameGenre = gameCard.getAttribute('data-genre');
        const gamePrice = parseFloat(gameCard.getAttribute('data-price')).toFixed(2) + ' €';

        // Mostrar la ventana emergente con la información del juego
        const modal = document.getElementById('game-info-modal');
        modal.querySelector('.modal-title').textContent = gameName;
        modal.querySelector('.modal-image').src = gameImageSrc;
        modal.querySelector('.modal-description').textContent = gameDescription;
        modal.querySelector('.modal-rate').textContent = `Rate: ${gameRate}`;
        modal.querySelector('.modal-genre').textContent = `Genre: ${gameGenre}`;
        modal.querySelector('.modal-price').textContent = gamePrice; // Añadido para mostrar el precio
        modal.style.display = 'flex';
        modal.style.opacity = '1';  // Hace visible el modal
    }

    // Funcionalidad para ver valoraciones
    function viewValoraciones() {
        const gameName = document.querySelector('.modal-title').textContent;
        window.location.href = `./valoraciones/valoracion.html?gameName=${gameName}`;
    }

    // Cerrar la ventana emergente
    function closeModal() {
        const modal = document.getElementById('game-info-modal');
        modal.style.opacity = '0'; // Hace desaparecer el modal
        setTimeout(() => {
            modal.style.display = 'none'; // Oculta el modal después de que desaparezca
        }, 300); // El tiempo de desaparición es el de la animación
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

        const closeModalButton = document.querySelector('.close-modal');
        closeModalButton.addEventListener("click", closeModal);

        const valoracionesButton = document.querySelector('.valoraciones-button');
        valoracionesButton.addEventListener("click", viewValoraciones);
    }

    // Redirigir a la página de cesta
    document.getElementById("cart-button").addEventListener("click", function() {
        window.location.href = "cesta.html"; // Redirige a la nueva página
    });

    // Función para cargar los juegos y añadir los eventos
    async function loadGames() {
        try {
            const response = await fetch('/casoEstudio1/data');
            if (!response.ok) {
                throw new Error('No se pudo obtener la lista de juegos');
            }
            games = await response.json();
            console.log('casoEstudio1:', games); // Verifica que los datos se están obteniendo

            displayGames(games);
            addEventListeners();
        } catch (error) {
            console.error('Error cargando los juegos:', error);
        }
    }

    // Función para mostrar los juegos
    function displayGames(games) {
        const gameList = document.getElementById('game-list');
        gameList.innerHTML = ''; // Limpiar la lista antes de agregar nuevos elementos

        games.forEach(game => {
            console.log('Game:', game); // Verifica cada juego individualmente

            const gameCard = document.createElement('div');
            gameCard.classList.add('game-card');
            gameCard.setAttribute('data-description', game.game_description);
            gameCard.setAttribute('data-rate', game.game_rate);
            gameCard.setAttribute('data-genre', game.game_genre);
            gameCard.setAttribute('data-price', game.game_cost); // Añadido para el precio

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
    }

    // Función para buscar juegos
    function searchGames(event) {
        const searchTerm = event.target.value.toLowerCase();
        const filteredGames = games.filter(game => game.game_name.toLowerCase().includes(searchTerm));
        displayGames(filteredGames);
    }

    // Añadir evento de búsqueda
    document.getElementById('search').addEventListener('input', searchGames);

    // Función para manejar el menú de perfil
    function handleProfileMenu(event) {
        const action = event.target.textContent;
        if (action === 'Mi cuenta') {
            window.location.href = './perfil/perfil.html';
        } else if (action === 'Historial') {
            window.location.href = './historial/historial.html';
        } else if (action === 'Cerrar sesión') {
            window.location.href = './app/pages/login.html'; // Redirige a la página de inicio de sesión
        }
    }

    // Mostrar/ocultar el menú de perfil
    document.getElementById('profile-button').addEventListener('click', function() {
        const dropdown = document.getElementById('dropdown');
        dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
    });

    // Añadir evento al menú de perfil
    document.querySelectorAll('.dropdown-content a').forEach(link => {
        link.addEventListener('click', handleProfileMenu);
    });

    // Cargar los juegos al cargar la página
    loadGames();
});