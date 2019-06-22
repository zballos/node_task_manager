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
    server.post('/users/forgot_password', UserController.forgot_password)
    server.post('/users/authenticate', UserController.authenticate)

    //TaskList
    server.get('/task_list', TaskListController.index)
    server.post('/task_list', TaskListController.save)
    server.get('/task_list/:id', TaskListController.get)
    server.put('/task_list/:id', TaskListController.update)
    server.delete('/task_list/:id', TaskListController.delete)

    //Task
    server.get('/task_list/:task_list_id/task', TaskController.index)
    server.post('/task_list/:task_list_id/task', TaskController.save)
    server.get('/task_list/:task_list_id/task/:id', TaskController.get)
    server.put('/task_list/:task_list_id/task/:id', TaskController.update)
    server.delete('/task_list/:task_list_id/task/:id', TaskController.delete)
}
