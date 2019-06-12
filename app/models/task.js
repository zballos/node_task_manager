const restful = require('node-restful')
const mongoose = restful.mongoose

const taskSchema = new mongoose.Schema({
    task_list_id: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: Boolean, required: true }
})

module.exports = restful.model('Task', taskSchema)