import http from 'node:http';
import nconf from 'nconf';

import 'app/config/environment.mjs';
import app from 'app/app.mts';

const port = normalizePort(nconf.get('PORT'));
app.set('port', port);

const server = http.createServer(app);
server.on('error', onError);

server.listen(port);
console.log(`Server is running on port ${port}`);

function normalizePort(value: string): number | string | boolean {
  const port = parseInt(value, 10);

  if (isNaN(port)) {
    return value;
  }

  if (port >= 0) {
    return port;
  }

  return false;
}

function onError(error: NodeJS.ErrnoException): void {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      break;
    default:
      console.error(error);
  }

  process.exit(1);
}
