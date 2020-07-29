const bcrypt = require('bcrypt');

const saltRounds = 10;


module.exports = {
  hashPassword: password => bcrypt.hash(password, bcrypt.genSalt(saltRounds)),

  compare: (password, hash) => bcrypt.compare(password, hash),
};
