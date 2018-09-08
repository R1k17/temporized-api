const express = require('express');
const router  = express.Router();
const db = require('../models');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

router.get('/', (req, res) => {
    db.Todo.find()
    .then((todos) => {
        res.json(todos);
    })
    .catch((err) => {
        res.send(err);
    })
})

router.post('/', (req, res) => {
    db.Todo.create(req.body)
    .then((newTodo) => {
        res.status(201).json(newTodo); 
    })
    .catch((err) =>{
        res.send(err);
    })
})

// if it is not working use the commented out lines instead
// router.get('/:todoId', (req, res) => {
router.get('/:id', (req, res) => {
    // db.Todo.findById(req.params.todoId)
    db.Todo.findById(req.params.id)
    .then((foundTodo) => {
        res.json(foundTodo)
    })
    .catch((err) => {
        res.send(err);
    })
})

router.put('/:id', (req, res) => {
    db.Todo.findByIdAndUpdate({_id: req.params.id}, req.body, {new: true})
    .then((todo) => {
        res.json(todo);
    })
    .catch((err) => {
        res.send(err);
    })
})

router.delete('/:id', (req, res) => {
    db.Todo.remove({_id: req.params.id})
    .then(() => {
        res.json({msg: 'Todo deleted'})
    })
    .catch((err) => {
        res.send(err)
    })
})
module.exports = router;