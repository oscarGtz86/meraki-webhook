/**
 * Server entrypoint
 * @author Oscar Escamilla
 * @date 28.03.2022
 */

require('dotenv').config();
const Server = require('./models/server');

const server = new Server();
server.listen();