const { Pool } = require('pg');
const ENV = process.env.NODE_ENV || 'development';

const envFilePath = `${__dirname}/../.env.${ENV}`;

require('dotenv').config({
  path:envFilePath,
});

if (!process.env.PGDATABASE) {
  throw new Error('PGDATABASE not set');
}

module.exports = new Pool();