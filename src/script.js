document.addEventListener('DOMContentLoaded', () => {

    const gamesContainer = document.getElementById('games-container');

    // Hacemos la peticion a nuestro backend
    fetch('/api/games')
    .then(response => response.json()) // Convertimos la respuesta a JSON
    .then(games => {
        // Limpiamos el contenedor por si acaso
        gamesContainer.innerHTML = '';

        games.forEach(game => {
            const gameCardHTML = `
          <a href="game.html?id=${game.id}" class="game-card-link">
            <div class="game-card">
                <img src="${game.poster_image}" alt="Póster de ${game.name}">

                <img class="character-pop" src="${game.character_image}" alt="Personaje de ${game.name}">
            </div>
          </a>
        `;
        gamesContainer.innerHTML += gameCardHTML;
        });
    })
    .catch(error => console.error('Error al cargar los juegos; ', error ));
})