'use strict';

const express = require('express');
const app = express();
const cors = require('cors');
const {CLIENT_ORIGIN} = require('./config');
// const mongoose = require('mongoose');
// mongoose.Promise = global.Promise;

app.use(
    cors({
        origin: CLIENT_ORIGIN
    })
);

const board = {
    lists: [
        {
            title: 'Example list 1',
            cards: [
                {
                    text: 'Example card 1'
                },
                {
                    text: 'Example card 2'
                }
            ]
        },
        {
            title: 'Example list 2',
            cards: [
                {
                    text: 'Example card 1'
                },
                {
                    text: 'Example card 2'
                }
            ]
        }
    ]
};

app.get('/api/board', (req, res) => {
    res.json(board);
})

app.listen(8080);

// app.use(express.static('public'));

// const PORT = process.env.PORT || 3000;

// app.get('/api/*', (req, res) => {
//     res.json({ok: true});
// });

//  app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

//  module.exports = {app};