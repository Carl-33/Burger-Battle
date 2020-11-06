// Dependencies
var Sequelize = require("sequelize");
// var mysql = require("mysql");

if (process.env.CLEARDB_DATABASE_URL){  
  var sequelize = new Sequelize(process.env.CLEARDB_DATABASE_URL)
} else {
  var sequelize = new Sequelize("Restaurant_list", "root", "root", {
    host: "localhost",
    port: 3306,
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    }
  })
}

// Creates mySQL connection using Sequelize, the empty string in the third argument spot is our password.

// Exports the connection for other files to use
module.exports = sequelize;