const db = require('../models/db');
const helpers = require('../helpers');


class HapiController {
  static home(req, res) {
    return res.response({
      message: 'Welcome to HapiJs Home',
      success: true,
    }).code(200);
  }

  static async signup(req, res) {
    const {
      firstName, lastName, email,
      phoneNumber, password, isAdmin,
    } = req.payload;

    try {
      const hashed = await helpers.hashPassword(password);
      const newUser = await db.query(
        `insert into koaschema.users(first_name, email, last_name, phone_number, is_admin, pass)
        values($1, $2, $3, $4, $5, $6)
        RETURNING id, email, is_admin`,
        [firstName, email, lastName, phoneNumber, isAdmin, hashed],
      );
      return res.response({
        success: true,
        response: newUser.rows,
        message: 'User signed up successful',
      }).code(201);
    } catch (error) {
      return res.response({ success: false, message: error.detail }).code(400);
    }
  }

  static async signin(req, res) {
    const { email, password } = req.payload;
    const user = await db.query('select * from koaschema.users where email=$1', [email]);
    if (user.rows.length === 0) {
      return res.response({
        message: 'Email/Password is incorrect',
        success: false,
      }).code(400);
    }
    const comparePassword = await helpers.compare(password, user.rows[0].pass);
    if (!comparePassword) {
      return res.response({
        message: 'Email/Password is incorrect',
        success: false,
      }).code(400);
    }
    return res.response({ success: true, message: 'User signin successful' }).code(200);
  }
}


module.exports = HapiController;
