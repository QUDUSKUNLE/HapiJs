const db = require('../models/db');
const helpers = require('../helpers');


class HapiController {
  static home() {
    return ({
      message: 'Welcome to HapiJs Home',
      success: true,
    });
  }

  static async signup(req) {
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
      return ({
        success: true,
        response: newUser.rows,
        message: 'User signed up successful',
      });
    } catch (error) {
      return { success: false, message: error.detail };
    }
  }

  static async signin(req) {
    const { email, password } = req.payload;
    const user = await db.query('select * from koaschema.users where email=$1', [email]);
    if (user.rows.length === 0) {
      return {
        message: 'Email/Password is incorrect',
        success: false,
      };
    }
    const comparePassword = await helpers.compare(password, user.rows[0].pass);
    if (!comparePassword) {
      return {
        message: 'Email/Password is incorrect',
        success: false,
      };
    }
    return { success: true, message: 'User signin successful' };
  }
}


module.exports = HapiController;
