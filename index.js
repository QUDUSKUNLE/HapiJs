/* eslint-disable no-console */
const Hapi = require('hapi');
const dotenv = require('dotenv');
const basicAuthBasic = require('hapi-auth-basic');

const auth = require('./src/middleware/basicAuthentication');
const HapiController = require('./src/controllers/hapiController');
const paths = require('./src/helpers/path');

dotenv.config();
const { validate } = auth;

const app = async () => {
  const server = Hapi.server({ port: process.env.PORT, host: process.env.HOST });
  await server.register(basicAuthBasic);
  server.auth.strategy('simple', 'basic', { validate });

  server.route([
    {
      method: paths.methods.get,
      path: paths.route.home,
      handler: async (req, res) => {
        const response = await HapiController.home(req);
        return res.response(response).code(200);
      },
    },
    {
      method: paths.methods.post,
      path: paths.route.signup,
      handler: async (req, res) => {
        const response = await HapiController.signup(req);
        if (!response.success) return res.response(response).code(409);
        return res.response(response).code(201);
      },
    },
    {
      method: paths.methods.post,
      path: paths.route.signin,
      options: {
        log: {
          collect: true,
        },
      },
      handler: async (req, res) => {
        req.log('error', 'Event error');
        const response = await HapiController.signin(req);
        if (!response.success) return res.response(response).code(400);
        return res.response(response).code(200);
      },
    },
  ]);

  await server.start();
  console.log(
    `Server running on ${server.info.uri}`,
  );
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});


app();
