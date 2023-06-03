import { Dialect, Sequelize } from 'sequelize';
require("dotenv").config();

const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const dbHost = process.env.DB_HOST;
const dbDriver = process.env.DB_DRIVER as Dialect
const dbPassword = process.env.DB_PASS;

const sequelizeConnection = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  dialect: dbDriver
})
sequelizeConnection.sync({alter: true});

export default sequelizeConnection