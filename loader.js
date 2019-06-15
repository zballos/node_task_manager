const server = require('./app/config/server')

require('./app/config/database')
require('./app/config/routes')(server)
