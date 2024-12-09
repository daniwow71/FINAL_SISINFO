document.addEventListener("DOMContentLoaded", function() {
    const updateAccountForm = document.getElementById('update-account-form');
    const ownedGamesList = document.getElementById('owned-games-list');
    const currentUsername = document.getElementById('current-username');
    const currentEmail = document.getElementById('current-email');
    const currentBirthDate = document.getElementById('current-birth-date');
    const cartList = document.getElementById('cart-list');

    async function loadAccountInfo() {
        const userName = localStorage.getItem('userName');
        if (userName) {
            try {
                const response = await fetch(`/api/account-info?username=${userName}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                if (!response.ok) {
                    throw new Error('No se pudo obtener la información de la cuenta');
                }
                const accountInfo = await response.json();
                currentUsername.textContent = accountInfo.user_name;
                currentEmail.textContent = accountInfo.user_mail;
                currentBirthDate.textContent = accountInfo.birth_date;
                document.getElementById('username').value = accountInfo.user_name;
                document.getElementById('email').value = accountInfo.user_mail;
                document.getElementById('birth-date').value = accountInfo.birth_date;
            } catch (error) {
                console.error('Error cargando la información de la cuenta:', error);
            }
        } else {
            console.error('No se encontró el userName en localStorage');
        }
    }

    async function loadOwnedGames() {
        try {
            const response = await fetch('/api/owned-games', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (!response.ok) {
                throw new Error('No se pudo obtener la lista de juegos en posesión');
            }
            const games = await response.json();
            ownedGamesList.innerHTML = '';
            games.forEach(game => {
                const listItem = document.createElement('li');
                listItem.innerHTML = `
                    <img src="${game.game_poster}" alt="${game.game_name}" />
                    <span>${game.game_name}</span>
                    <span>Key: ${game.game_key}</span>
                `;
                ownedGamesList.appendChild(listItem);
            });
        } catch (error) {
            console.error('Error cargando los juegos en posesión:', error);
        }
    }

    async function updateAccount(event) {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const birthDate = document.getElementById('birth-date').value;

        try {
            const response = await fetch('/api/update-account', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ user_name: username, user_mail: email, birth_date: birthDate })
            });
            if (!response.ok) {
                const errorData = await response.json();
                alert(`Error: ${errorData.message}`);
                throw new Error('No se pudo actualizar la información de la cuenta');
            }
            alert('Información de la cuenta actualizada con éxito');
            loadAccountInfo(); // Recargar la información actualizada
        } catch (error) {
            console.error('Error actualizando la información de la cuenta:', error);
        }
    }

    async function addToCart(gameName) {
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
            listItem.innerHTML = `
                <img src="${gameInfo.game_poster}" alt="${gameInfo.game_name}" />
                <span>${gameInfo.game_name}</span>
                <span>${gameInfo.game_cost}</span>
            `;
            cartList.appendChild(listItem);
        } catch (error) {
            console.error('Error agregando el juego a la cesta:', error);
        }
    }

    updateAccountForm.addEventListener('submit', updateAccount);

    loadAccountInfo();
    loadOwnedGames();
});