var TaskList = require('../models/taskList')

class TaskListController {

    async index(req, res) {
        var taskList = await TaskList.find().exec()
        res.json(taskList)
    }

    async save (req, res) {
        var taskList = await new TaskList({
            user_id: req.body.user_id,
            name: req.body.name,
            color: req.body.color
        }).save()

        res.json(taskList)
    }

    async get(req, res) {
        var taskList = await TaskList.findOne({ _id: req.params.id }).exec()
        if (!taskList) {
            return res.status(404).json({ 'message': 'Lista de Tarefas não encontrada' })
        }

        return res.json(taskList)
    }

    async update(req, res) {
        var taskList = await TaskList.findOne({ _id: req.params.id }).exec()
        
        if (!taskList) {
            return res.status(404).json({ 'message': 'Lista de Tarefas não encontrada' })
        }

        taskList.user_id = req.body.user_id
        taskList.name = req.body.name
        taskList.color = req.body.color
        taskList = await taskList.save()
     
        return res.json(taskList)
    }

    async delete(req, res) {
        await TaskList.findByIdAndRemove(req.params.id)
        return res.status(204).json({})
    }
}

//exports = 
module.exports = new TaskListController()