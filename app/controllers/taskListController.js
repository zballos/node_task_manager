var TaskList = require('../models/taskList')

class TaskListController {

    async index(req, res) {
        if (!req.body.user_id) {
            return res.status(404).json({ 'message': 'Lista apenas por usuário.' })
        }

        var taskList = await TaskList.find({ user_id: req.body.user_id }).exec()
        res.json(taskList)
    }

    async save (req, res) {
        if (!req.body.user_id) {
            return res.status(404).json({ 'message': 'Informe um usuário.' })
        }
        
        var taskList = await new TaskList({
            user_id: req.body.user_id,
            name: req.body.name,
            color: req.body.color
        });

        await taskList
            .save()
            .then(data => {
                res.json(data)
            })
            .catch(error => {
                res.status(500).json({ 'message': error.message })
            });
    }

    async get(req, res) {
        var taskList = await TaskList.findOne({ _id: req.params.id }).exec()
        if (!taskList) {
            return res.status(404).json({ 'message': 'Lista de Tarefas não encontrada' })
        }

        return res.json(taskList)
    }

    async update(req, res) {
        if (!req.body.user_id) {
            return res.status(404).json({ 'message': 'Informe um usuário.' })
        }

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
        return res.status(204).json({'message': 'Lista de tarefas excluída.'})
    }
}

//exports = 
module.exports = new TaskListController()