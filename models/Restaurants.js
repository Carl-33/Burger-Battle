// Dependencies
// =============================================================

// Sequelize (capital) references the standard library
var Sequelize = require("Sequelize");
// sequelize (lowercase) references my connection to the DB.
var sequelize = require("../config/connection.js");

// Creates a "Restaurant" model that matches up with DB
var Restaurant = sequelize.define("Restaurant", {
  Name: Sequelize.STRING,
  Burger: Sequelize.INTEGER,
  Comment: Sequelize.STRING,
  Fries: Sequelize.INTEGER,
  Beer: Sequelize.INTEGER
});

// Syncs with DB
Restaurant.sync();

// Makes the Restaurant Model available for other files (will also create a table)
module.exports = Restaurant;
  