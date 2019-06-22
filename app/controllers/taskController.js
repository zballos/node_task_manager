var Task = require('../models/task')

class TaskController {

    async index(req, res) {
        console.log(req.params)
        if (!req.params.task_list_id) {
            return res.status(404).json({ 'message': 'Apenas tarefas da lista.' })
        }

        var task = await Task.find({ task_list_id: req.params.task_list_id }).exec()
        res.json(task)
    }

    async save (req, res) {
        if (!req.params.task_list_id) {
            return res.status(404).json({ 'message': 'Lista tarefas e obrigatório.' })
        }
        
        var task = await new Task({
            task_list_id: req.params.task_list_id,
            description: req.body.description,
            status: req.body.status
        });

        await task
            .save()
            .then(data => {
                res.json(data)
            })
            .catch(error => {
                res.status(500).json({ 'message': error.message })
            });
    }

    async get(req, res) {
        if (!req.params.task_list_id) {
            return res.status(404).json({ 'message': 'Lista tarefas e obrigatório.' })
        }

        var task = await Task.findById({ _id: req.params.id }).exec()
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
        var task = await new Task({
            task_list_id: req.params.task_list_id,
            description: req.body.description,
            status: req.body.status
        });

        await task
            .save()
            .then(data => {
                res.json(data)
            })
            .catch(error => {
                res.status(500).json({ 'message': error.message })
            });
    }

    async delete(req, res) {
        if (!req.params.task_list_id) {
            return res.status(404).json({ 'message': 'Lista tarefas e obrigatório.' })
        }

        await Task.findByIdAndRemove(req.params.id)
        return res.status(204).json({'message': 'Lista de tarefas excluída.'})
    }
}

//exports = 
module.exports = new TaskController()