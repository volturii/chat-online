const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Określamy ścieżkę do pliku index.html
const indexPath = path.join(__dirname, 'index.html');

app.get('/', (req, res) => {
    // Wysyłamy plik index.html przy żądaniu ścieżki '/'
    res.sendFile(indexPath);
});

io.on('connection', (socket) => {
    console.log('Nowe połączenie:', socket.id);

    socket.on('message', (message) => {
        io.emit('message', { id: socket.id, message: message });
    });

    socket.on('disconnect', () => {
        console.log('Rozłączenie:', socket.id);
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Serwer nasłuchuje na porcie ${PORT}`);
});
