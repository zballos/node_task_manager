const mongoose = require('mongoose')

module.exports = mongoose.connect('mongodb://127.0.0.1:27017/taskmanager', {
    useNewUrlParser: true
 }).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});
