document.addEventListener('DOMContentLoaded', () => {
  
  // Extrae el ID del juego desde la URL para saber que contenido mostrar
  const urlParams = new URLSearchParams(window.location.search);
  const gameId = urlParams.get('id');

  // Seleccionamos los elementos del HTML que vamos a rellenar
  const titleElement = document.getElementById('game-title');
  const descriptionElement = document.getElementById('game-description');
  const videoContainer = document.getElementById('video-container');

  fetch('/api/games')
    .then(response => response.json())
    .then(games => {
        // Buscar el juego por ID
      const game = games.find(g => g.id == gameId);

      if (game) {
        titleElement.innerText = game.name;
        titleElement.classList.add(game.neon_class);
        descriptionElement.innerText = game.deck;

        // Insertar el video de YouTube
        videoContainer.innerHTML = `
        <iframe class="w-full h-full" src="https://www.youtube.com/embed/${game.trailer_id}?autoplay=1&mute=1" 
        title="YouTube video player" frameborder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
        referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        `;

        // Reproducir el sonido 
        if (game.sound_file) {
          const gameSound = new Audio(game.sound_file);
          gameSound.play();
        }
      } else {
        titleElement.innerText = 'Juego no encontrado';
      }
    })
    .catch(error => console.error('Error al cargar los detalles del juego:', error));
});