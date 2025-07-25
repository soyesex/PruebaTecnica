document.addEventListener('DOMContentLoaded', () => {

    const gamesContainer = document.getElementById('games-container');

    // Hacemos la peticion a nuestro backend
    fetch('/api/games')
    .then(response => response.json()) // Convertimos la respuesta a JSON
    .then(data => {
    // Obtenemos la lista de juegos de la propiedad 'results'
    const games = data.results;
    
    // Filtramos los juegos que tienen imagen y tienen una descripción corta (deck).
    const filteredGames = games.filter(game => {
        return game.image && game.deck;
    })

    // Iteramos sobre cada juego y creamos un elemento HTML
    filteredGames.forEach(game => {
        const imageUrl = game.image.medium_url;

        // Accedemos a las propiedades: game.name, game.image.medium_url, game.deck (descripción corta)
        const gameCardHTML = `
        <div class="game-card">
            <img class="card-image" src="${imageUrl}" alt="Portada de ${game.name}" >
            <div class="card-content">
                <h3 class="card-title">${game.name}</h3>
                <p class="card-description">
                ${game.deck}
                </p>
            </div>
        </div>
        `;

        // Añadimos la tarjeta recien creada al contenedor
        gamesContainer.innerHTML += gameCardHTML;
    });
    })
    .catch(error => {
        console.error('Error al cargar los juegos:', error);
        gamesContainer.innerHTML = '<p class="text-red-500">Error al cargar los juegos.</p>';
    });
})