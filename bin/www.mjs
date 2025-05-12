import http from 'node:http';
import nconf from 'nconf';
import 'app/config/environment.mjs';
import app from 'app/app.mts';
var port = normalizePort(nconf.get('PORT'));
app.set('port', port);
var server = http.createServer(app);
server.on('error', onError);
server.listen(port);
console.log("Server is running on port ".concat(port));
function normalizePort(value) {
    var port = parseInt(value, 10);
    if (isNaN(port)) {
        return value;
    }
    if (port >= 0) {
        return port;
    }
    return false;
}
function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }
    var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
        default:
            throw error;
    }
}
