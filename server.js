const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = 3000;

// Servir los archivos estaticos 
app.use(express.static(path.join(__dirname, '')));

// Ruta para la pagina principal que sirve el index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Endpoint de API que llama a la api
app.get('/api/games', async (req, res) => {
    fs.readFile('games.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error al leer el archivo de juegos.' });
        }
        res.json(JSON.parse(data));
    });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});