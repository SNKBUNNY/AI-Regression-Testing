const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
const { runTests, handleAIChat } = require('./testEngine');

const app = express();
app.use(cors());
const server = http.createServer(app);

const io = new Server(server, {
    cors: { origin: "*" }
});

io.on('connection', (socket) => {
    console.log('Dashboard connected:', socket.id);

    socket.on('start-regression-test', async (url) => {
        console.log(`Starting test for: ${url}`);
        await runTests(url, socket);
    });

    // Handle AI Chat questions
    socket.on('ask-ai', async (data) => {
        await handleAIChat(data.question, data.results, socket);
    });
});

const PORT = 5001;
server.listen(PORT, () => {
    console.log(`Real-Time Test Engine running on http://localhost:${PORT}`);
});