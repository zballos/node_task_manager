                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               const express = require('express')

var UserController = require('../controllers/UserController')
var TaskController = require('../controllers/TaskController')
var TaskListController = require('../controllers/TaskListController')

module.exports = function(server) {
    const router = express.Router()
    server.use('/api', router)

    //USER
    server.get('/users', UserController.index)
    server.post('/users', UserController.save)
    server.get('/users/:user_id', UserController.get)
    server.put('/users/:user_id', UserController.update)
    server.delete('/users/:user_id', UserController.delete)

    //TaskList
    server.get('/taskList', TaskListController.index)
    server.post('/taskList', TaskListController.save)
    server.get('/taskList/:id', TaskListController.get)
    server.put('/taskList/:id', TaskListController.update)
    server.delete('/taskLists/:id', TaskListController.delete)

    //Task
    server.get('/task', TaskController.index)
    server.post('/task', TaskController.save)
    server.get('/task/:id', TaskController.get)
    server.put('/task/:id', TaskController.update)
    server.delete('/task/:id', TaskController.delete)
}
