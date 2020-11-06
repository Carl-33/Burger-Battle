// Dependencies
// =============================================================

// Sequelize (capital) references the standard library
var Sequelize = require("sequelize");
// sequelize (lowercase) references my connection to the DB.
var sequelize = require("../config/connection.js");

// Creates a "Restaurant" model that matches up with DB
var Restaurant = sequelize.define("Restaurant", {
  Name: Sequelize.STRING,
  // Burger: Sequelize.INTEGER,
  Score: Sequelize.INTEGER
  // Comment: Sequelize.STRING,
  // Fries: Sequelize.INTEGER,
  // Beer: Sequelize.INTEGER
});

Restaurant.associate = function(models) {
  // Associating Restaurant with Posts
  Restaurant.hasMany(models.Comments)

return Restaurant;
}
// Syncs with DB
Restaurant.sync();

// Makes the Restaurant Model available for other files (will also create a table)
module.exports = Restaurant;
