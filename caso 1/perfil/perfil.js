document.addEventListener("DOMContentLoaded", function() {
    const updateAccountForm = document.getElementById('update-account-form');
    const ownedGamesList = document.getElementById('owned-games-list');
    const currentUsername = document.getElementById('current-username');
    const currentEmail = document.getElementById('current-email');
    const currentBirthDate = document.getElementById('current-birth-date');
    const valoracionesList = document.getElementById('valoraciones-list');

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

    async function loadUserValoraciones() {
        try {
            const response = await fetch('/api/user-valoraciones', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (!response.ok) {
                throw new Error('No se pudo obtener las valoraciones del usuario');
            }
            const valoraciones = await response.json();
            valoracionesList.innerHTML = '';
            for (const valoracion of valoraciones) {
                try {
                    const gameResponse = await fetch(`/api/game-info?gameName=${valoracion.game_name}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });
                    if (!gameResponse.ok) {
                        throw new Error('No se pudo obtener la información del juego');
                    }
                    const gameInfo = await gameResponse.json();
                    const listItem = document.createElement('li');
                    listItem.innerHTML = `
                        <img src="${gameInfo.game_poster}" alt="${valoracion.game_name}" />
                        <div class="valoracion-info">
                            <h3>${valoracion.game_name}</h3>
                            <p>${valoracion.valoracion}</p>
                            <span class="fecha">${new Date(valoracion.fecha).toLocaleDateString()}</span>
                        </div>
                    `;
                    valoracionesList.appendChild(listItem);
                } catch (error) {
                    console.error('Error cargando la información del juego:', error);
                }
            }
        } catch (error) {
            console.error('Error cargando las valoraciones del usuario:', error);
        }
    }

    async function updateAccount(event) {
        event.preventDefault();
        const userName = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const birthDate = document.getElementById('birth-date').value;

        try {
            const response = await fetch('/api/update-account', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ user_name: userName, user_mail: email, birth_date: birthDate })
            });
            if (!response.ok) {
                throw new Error('No se pudo actualizar la cuenta');
            }
            alert('Cuenta actualizada con éxito');
            loadAccountInfo();
        } catch (error) {
            console.error('Error actualizando la cuenta:', error);
        }
    }

    updateAccountForm.addEventListener('submit', updateAccount);

    loadAccountInfo();
    loadOwnedGames();
    loadUserValoraciones();
});