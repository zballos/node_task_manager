var Task = require('../models/task')

class TaskController {

    async index(req, res) {
        var task = await Task.find().exec()
        res.json(task)
    }

    async save (req, res) {
        var task = await new Task({
            task_list_id: req.body.task_list_id,
            description: req.body.description,
            status: req.body.status
        }).save()

        res.json(task)
    }

    async get(req, res) {
        var task = await Task.findOne({ _id: req.params.id }).exec()
        if (!task) {
            return res.status(404).json({ 'message': 'Tarefa não encontrada' })
        }

        return res.json(task)
    }

    async update(req, res) {
        var task = await Task.findOne({ _id: req.params.id }).exec()
        if (!task) {
            return res.status(404).json({ 'message': 'Tarefa não encontrada' })
        }
        task.description = req.body.description
        task.status = req.body.status
        task = await task.save()
     
        return res.json(task)
    }

    async delete(req, res) {
        await Task.findByIdAndRemove(req.params.id)
        return res.status(204).json({})
    }
}

//exports = 
module.exports = new TaskController()