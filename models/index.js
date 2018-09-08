
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/todo-api', {useNewUrlParser: true});
mongoose.Promise = global.Promise;

module.exports.Todo = require('./todo');
