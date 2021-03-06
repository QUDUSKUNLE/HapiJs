const dotenv = require('dotenv');
const { Pool } = require('pg');

dotenv.config();
const db = new Pool({ connectionString: process.env.DATABASE_URL });


module.exports = db;
