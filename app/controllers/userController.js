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
        var user = await User.findById(req.params.user_id).exec();
        
        if (!user) {
            return res.status(404).json({ 'message': 'Usuário não encontrado' })
        }

        return res.json(user)
    }

    async update(req, res) {
        var user = await User.findOne({ _id: req.params.user_id }).exec()
        if (!user) {
            return res.status(404).json({ 'message': 'Usuário não encontrado' })
        }

        user.name = req.body.name
        user.email = req.body.email
        user.avatar = req.body.avatar
        user.password = req.body.password
        
        await user.save()
            .then(data => {
                res.json(data)
            })
            .catch(error => {
                res.status(500).json({ 'message': error.message })
            });
    }

    async delete(req, res) {
        var user = await User.findOne({ _id: req.params.user_id }).exec()
        if (!user) {
            return res.status(404).json({ 'message': 'Usuário não encontrado!' })
        }

        await User.findByIdAndRemove(req.params.user_id)
        return res.status(204).json({'message': 'Usuário excluído!'})
    }

    async forgot_password(req, res) {
        var user = await User.findOne({ email: req.body.email }).exec();
        
        if (!user) {
            return res.status(500).json({ 'message': 'E-mail não existe.' })
        }

        // TODO: Enviar e-mail com token para troca de senha.
        return res.json(user)
    }

    async authenticate(req, res) {
        if (!req.body.email || !req.body.password) {
            return res.status(500).json({ 'message': 'E-mail e senha obrigatórios.' })
        }
            
        var user = await User.findOne({ email: req.body.email, password: req.body.password }).exec();

        if (!user) {
            return res.status(500).json({ 'message': 'E-mail ou senha inválidos.' })
        }

        //TODO: Criptografar e decriptografar senha
        return res.json(user)
    }

    async get_by_email(req, res) {
        console.log(req);
        if (!req.params.email) {
            return res.status(500).json({ 'message': 'E-mail obrigatório.' })
        }

        var user = await User.findOne({ email: req.params.email }).exec();
        console.log(user);
        return res.json(user);
    }

    async save_facebook_user(req, res) {
        if (!req.body.email) {
            return res.status(500).json({ 'message': 'E-mail obrigatório.' })
        }

        var user = await User.findOne({ email: req.body.email }).exec();
        
        user.name = req.body.name;
        user.avatar = req.body.picture;
        user.token = req.body.user_facebook_id

        await user.save()
            .then(data => {
                res.json(data)
            })
            .catch(error => {
                res.status(500).json({ 'message': error.message })
            });

        return res.json(user);
    }
}

exports = module.exports = new UserController()