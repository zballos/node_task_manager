var User = require('../models/user')

class UserController {

    async index(req, res) {
        var users = await User.find().exec()
        res.json(users)
    }

    async save (req, res) {
        var emailJaExiste = await User.findOne({ email: req.body.email }).exec();
        
        if (emailJaExiste) {
            return res.status(500).json({ 'message': 'E-mail já cadastrado' })
        }

        var user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            avatar: req.body.avatar
        });
        
        user.save()
            .then(data => {
                res.json(data)
            })
            .catch(error => {
                res.status(500).json({ 'message': error.message })
            });
    }

    async get(req, res) {
        var user = await User.findOne({ _id: req.params.id }).exec()
        if (!user) {
            return res.status(404).json({ 'message': 'Usuário não encontrado' })
        }

        return res.json(user)
    }

    async update(req, res) {
        var user = await User.findOne({ _id: req.params.id }).exec()
        if (!user) {
            return res.status(404).json({ 'message': 'Usuário não encontrado' })
        }
        user.username = req.body.username
        user.password = req.body.password
        user = await user.save()
     
        return res.json(user)
    }

    async delete(req, res) {
        await User.findByIdAndRemove(req.params.id)
        return res.status(204).json({})
    }
}

exports = module.exports = new UserController()