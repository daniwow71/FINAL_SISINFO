document.addEventListener("DOMContentLoaded", function() {


    function openValoracionModal(gameName) {
        document.getElementById('valoracion-modal').style.display = 'flex';
        document.querySelector('.modal-game-name').textContent = gameName;
    }

    // Función para cerrar el modal de valoración
    function closeValoracionModal() {
        document.getElementById('valoracion-modal').style.display = 'none';
        document.getElementById('valoracion-form').reset();
    }

    // Función para enviar la valoración
    async function submitValoracion(event) {
        event.preventDefault();
        const gameName = document.querySelector('.modal-game-name').textContent;
        const valoracion = document.getElementById('valoracion-text').value;
        const positiva = document.getElementById('valoracion-positiva').checked;

        try {
            const response = await fetch('/api/add-valoracion', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ gameName, valoracion, positiva })
            });
            if (!response.ok) {
                throw new Error('No se pudo añadir la valoración');
            }
            alert('Valoración añadida con éxito');
            closeValoracionModal();
        } catch (error) {
            console.error('Error añadiendo la valoración:', error);
        }
    }

    // Añadir evento al formulario de valoración
    document.getElementById('valoracion-form').addEventListener('submit', submitValoracion);

    // Añadir evento al botón de cerrar el modal de valoración
    document.querySelector('.close-valoracion-modal').addEventListener('click', closeValoracionModal);


    async function loadTransactionHistory() {
        const historyList = document.getElementById('history-list');
        historyList.innerHTML = '';

        try {
            const response = await fetch('/api/transaction-history', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (!response.ok) {
                throw new Error('No se pudo obtener el historial de transacciones');
            }
            const transactions = await response.json();
            for (const transaction of transactions) {
                const response = await fetch(`/api/game-info?gameName=${transaction.game_name}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                if (!response.ok) {
                    throw new Error('No se pudo obtener la información del juego');
                }
                const gameInfo = await response.json();

                // Formatear la fecha para mostrar solo la fecha sin la hora
                const date = new Date(transaction.FECHA);
                const formattedDate = date.toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit'
                });

                // Formatear el precio para mostrarlo con el símbolo de euros y dos decimales
                const formattedPrice = `${parseFloat(gameInfo.game_cost).toFixed(2)} €`;

                const listItem = document.createElement('li');
                listItem.innerHTML = `
                    <img src="${gameInfo.game_poster}" alt="${gameInfo.game_name}" style="width: 50px; height: auto;" />
                    <span>${gameInfo.game_name}</span>
                    <span>${formattedDate}</span>
                    <span>${formattedPrice}</span>
                    <button class="return-button" data-transaction-id="${transaction.ID}" data-game-name="${transaction.game_name}">Devolver</button>
                    <button class="valoracion-button" data-game-name="${transaction.game_name}">Valorar</button>
                `;
                historyList.appendChild(listItem);
            }

            // Añadir evento de clic a los botones de devolución
            document.querySelectorAll('.return-button').forEach(button => {
                button.addEventListener('click', async function() {
                    const transactionId = this.getAttribute('data-transaction-id');
                    const gameName = this.getAttribute('data-game-name');
                    try {
                        const response = await fetch('/api/return-transaction', {
                            method: 'DELETE',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${localStorage.getItem('token')}`
                            },
                            body: JSON.stringify({ transactionId, gameName })
                        });
                        if (!response.ok) {
                            throw new Error('No se pudo devolver la transacción');
                        }
                        alert('Transacción devuelta con éxito');
                        loadTransactionHistory(); // Recargar el historial de transacciones
                    } catch (error) {
                        console.error('Error devolviendo la transacción:', error);
                    }
                });
            });

            // Añadir evento de clic a los botones de valoración
            document.querySelectorAll('.valoracion-button').forEach(button => {
                button.addEventListener('click', function() {
                    const gameName = this.getAttribute('data-game-name');
                    openValoracionModal(gameName);
                });
            });
        } catch (error) {
            console.error('Error cargando el historial de transacciones:', error);
        }
    }

    loadTransactionHistory();

});