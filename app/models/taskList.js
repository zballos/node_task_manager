const restful = require('node-restful')
const mongoose = restful.mongoose

const taskListSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    color: { type: String, required: true }
})

module.exports = restful.model('TaskList', taskListSchema)