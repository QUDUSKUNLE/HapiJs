const paths = require('../helpers/path');
const HapiController = require('../controllers/hapiController');


module.exports = [
  {
    method: paths.methods.get,
    path: paths.route.home,
    handler: (req, res) => HapiController.home(req, res),
  },
  {
    method: paths.methods.post,
    path: paths.route.signup,
    handler: (req, res) => HapiController.signup(req, res),
  },
  {
    method: paths.methods.post,
    path: paths.route.signin,
    options: {
      log: {
        collect: true,
      },
    },
    handler: (req, res) => HapiController.signin(req, res),
  },
];
