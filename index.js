/* eslint-disable no-console */
const Hapi = require('hapi');
const dotenv = require('dotenv');
const basicAuthBasic = require('hapi-auth-basic');

const auth = require('./src/middleware/basicAuthentication');
const routes = require('./src/routes');

dotenv.config();
const { validate } = auth;

const app = async () => {
  const server = Hapi.server({ port: process.env.PORT, host: process.env.HOST });
  await server.register(basicAuthBasic);
  server.auth.strategy('simple', 'basic', { validate });

  server.route(routes);
  await server.start();
  console.log(`Server running on ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

app();
