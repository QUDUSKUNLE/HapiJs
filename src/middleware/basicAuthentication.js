const Bcrypt = require('bcrypt');


module.exports = {
  validate: (request, username, password) => {
    const user = request[username];
    if (!user) {
      return { credentials: null, isValid: false };
    }
    const isValid = Bcrypt.compare(password, user.password);
    const credentials = { id: user.id, name: user.name };
    return { isValid, credentials };
  },
};
