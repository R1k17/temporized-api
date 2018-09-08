'use strict';

const express = require("express");
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const cors = require('cors');
const bodyParser = require('body-parser');
const {CLIENT_ORIGIN} = require('./config');
const {PORT, DATABASE_URL} = require('./config');

// serves static assets located in the public folder
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('common'));
app.use(
  cors({
      origin: CLIENT_ORIGIN
  })
);

// app.listen(process.env.PORT || 8080, () => console.log(
//     `Your app is listening on port ${process.env.PORT || 8080}`));
  

const todoRoutes = require('../routes/todos_route');

app.get('/', (req,res) => {
    res.send('Hello from the root route');
})

app.use('/api/todos', todoRoutes);

let server;

function runServer() {
    const port = process.env.PORT || 8080;
    return new Promise((resolve, reject) => {
      server = app
        .listen(port, () => {
          console.log(`Your app is listening on port ${port}`);
          resolve(server);
        })
        .on("error", err => {
          reject(err);
        });
    });
  }

  function closeServer() {
    return new Promise((resolve, reject) => {
      console.log("Closing server");
      server.close(err => {
        if (err) {
          reject(err);
          // so we don't also call `resolve()`
          return;
        }
        resolve();
      });
    });
  }

  if (require.main === module) {
    runServer().catch(err => console.error(err));
  }
  
  module.exports = { app, runServer, closeServer };




/* 
const express = require('express');
const app = express();
const cors = require('cors');
const {CLIENT_ORIGIN} = require('./config');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const {PORT, DATABASE_URL} = require('./config');


app.use(
    cors({
        origin: CLIENT_ORIGIN
    })
);

const todoRoutes = require('./routes/todos');

app.get('/', (req,res) => {
    res.send('Hello from the root route');
})

app.use('/api/todos', todoRoutes);

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

// app.listen(8080);


let server;

// run server
function runServer(databaseUrl, port=PORT) {
  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, err => {
      if (err) {
        return reject(err);
      }

      server = app.listen(port, () => {
        console.log(`Your app is listening on port ${port}`);
        resolve();
      })
      .on('error', err => {
        mongoose.disconnect();
        reject(err);
      });
    });
  });
}

// close server
function closeServer() {
  return mongoose.disconnect().then(() => {
    return new Promise((resolve, reject) => {
      console.log('Closing server');
      server.close(err => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  });
}

if (require.main === module) {
  runServer(DATABASE_URL).catch(err => console.error(err));
}; */