const http = require('http');
const routes = require('./routes');

const server = http.createServer(routes.handler);

server.listen(4000, () => {
  console.log('Server listening on port 4000');
});
