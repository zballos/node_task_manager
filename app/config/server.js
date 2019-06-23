const porta = 8081;

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

const server = express()

server.use(bodyParser.urlencoded({extended: true}))
server.use(morgan('combined'))
server.use(bodyParser.json())
server.use(cors())

server.use(function(req, res, next){
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "content-type");
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
});

server.listen(process.env.porta || porta, function() {
    console.log('Listening on ' + porta);
})

module.exports = server