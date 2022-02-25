const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const server = express();
const pokemonRouter = require('./pokemon/pokemon-router');
const movesRouter = require('./moves/moves-router');

server.use(express.json());
server.use(cors());
server.use(helmet());
server.use('/api/pokemon', pokemonRouter);
server.use('/api/moves', movesRouter);

server.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        customMessage: err.customMessage,
        message: err.message,
        stack: err.stack
    })
})

module.exports = server;