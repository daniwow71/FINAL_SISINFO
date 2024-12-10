document.addEventListener("DOMContentLoaded", function() {
    async function loadValoraciones() {
        const gameName = new URLSearchParams(window.location.search).get('gameName');
        const valoracionesList = document.getElementById('valoraciones-list');
        valoracionesList.innerHTML = '';

        try {
            const response = await fetch(`/api/game-valoraciones?gameName=${gameName}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                throw new Error('No se pudo obtener las valoraciones del juego');
            }
            const valoraciones = await response.json();
            valoraciones.forEach(valoracion => {
                const listItem = document.createElement('li');
                const thumbImage = valoracion.positiva ? '../app/public/images/thumbs-up.png' : '../app/public/images/thumbs-down.png';
                listItem.innerHTML = `
                    <img src="${thumbImage}" alt="${valoracion.positiva ? 'Positiva' : 'Negativa'}" style="width: 50px; height: auto;" />
                    <div class="valoracion-info">
                        <div class="valoracion-header">
                            <span class="user-name">${valoracion.user_name}</span>
                            <span class="fecha">${new Date(valoracion.fecha).toLocaleDateString()}</span>
                        </div>
                        <p class="valoracion-text">${valoracion.valoracion}</p>
                    </div>
                `;
                valoracionesList.appendChild(listItem);
            });
        } catch (error) {
            console.error('Error cargando las valoraciones del juego:', error);
        }
    }

    loadValoraciones();
});