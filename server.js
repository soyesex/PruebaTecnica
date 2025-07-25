const express = require('express');
const path = require('path');
const fetch = require('node-fetch'); // Importamos para hacer llamadas a APIs
require('dotenv').config(); // Cargamos las variables de entorno

const app = express();
const PORT = 3000;
const apiKey = process.env.GIANTBOMB_API_KEY // Obtenemos la clave de la API desde las variables de entorno

// Servir los archivos estaticos 
app.use(express.static(path.join(__dirname, '')));

// Ruta para la pagina principal que sirve el index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Endpoint de API que llama a la api
app.get('/api/games', async (req, res) => {
    console.log('Peticion recibida en /api/games');

    // Verificamos si tenemos la api
    if (!apiKey) {
        return res.status(500).json({ error: 'API key no encontrada' });
    }
    // El ID para PC es 94, PS5 es 176, y Xbox Series X|S es 179
    const platformFilter = 'platforms:94|176|179';

    const giantBombUrl = `https://www.giantbomb.com/api/games/?api_key=${apiKey}&format=json&sort=number_of_user_reviews:desc&filter=original_release_date:2020-01-01|2025-12-31,${platformFilter}&limit=18`;

    try {
        const apiResponse = await fetch(giantBombUrl);
        const data = await apiResponse.json();
        res.json(data);
    } catch (error) {
        console.error('Error al llamar a la API:', error);
        res.status(500).json({ error: 'Error al llamar a la API' });
    }
})

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});