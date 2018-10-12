const Hapi = require("hapi");

console.log("Setting up Hapi Server");

// default values
const DEFAULT_HOST = "localhost";
const DEFAULT_PORT = 8090;
const RADIX = 10;

const server = Hapi.Server({
  host: process.env.HOST || DEFAULT_HOST,
  port: parseInt(process.env.PORT, RADIX) || DEFAULT_PORT,
  app: {}
});

server.route({
  method: 'GET',
  path: '/',
  handler: (request, h) => {

      return 'Hello World from Hapi Server!';
  }
});

server.route({
  method: 'GET',
  path: '/{name}',
  handler: (request, h) => {

      return 'Hello, ' + encodeURIComponent(request.params.name) + '!';
  }
});

// the server
const myServer = async () => {
  // add real functions
  try {
    //
    await server.start();
    console.log(`Hapi Server running at ${server.info.uri}`);
  } catch (err) {
    console.log("Hapi error starting server", err);
  }
  console.log(`Calling myServer`);

};

process.on('unhandledRejection', (err) => {

  console.log(err);
  process.exit(1);
});


// call the server
myServer();


