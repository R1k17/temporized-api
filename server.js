'use strict';

const express = require('express');
const app = express();
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

app.use(express.static('public'));

const PORT = process.env.PORT || 3000;

app.get('/api/*', (req, res) => {
    res.json({ok: true});
});

 app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

 module.exports = {app};