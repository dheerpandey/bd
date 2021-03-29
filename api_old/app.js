const http = require('http');
const { fork } = require('child_process');

const server = http.createServer();

server.on('request', (request, response) => {
  if (request.url === '/compute') {
    const compute = fork('compute.ts');
    compute.send('start');

    compute.on('message', result => {
        response.end(`Long computation result: ${result}`)
    });
  } else {
    response.end('Route not found')
  }
});

server.listen(3000);