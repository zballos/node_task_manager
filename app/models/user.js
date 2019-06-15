const restful = require('node-restful')
const mongoose = restful.mongoose

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    avatar: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }
})

userSchema.path('email').validate(function (email) {
    var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return emailRegex.test(email);
}, 'E-mail inválido!')

module.exports = restful.model('User', userSchema)
