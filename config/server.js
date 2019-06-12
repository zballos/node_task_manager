const porta = 4000;

const bodyParser = require('body-parser')
const express = require('express')
const server = express()

server.use(bodyParser.urlencoded({extended: true}))
server.use(bodyParser.json())

server.listen(process.env.porta || porta, function() {
    console.log('Listening on');
})

module.exports = server