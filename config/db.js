const Sequelize = require("sequelize");
require("dotenv").config();

const connection = new Sequelize(
  "cointabDatabase",
  "root",
  process.env.MYSQL_PASSWORD,
  {
    host: "localhost",
    dialect: "mysql",
  }
);

module.exports = {
  connection,
};
