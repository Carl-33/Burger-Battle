module.exports = function(sequelize, DataTypes) {
    const Restaurant = sequelize.define("Restaurant", {
      // Giving the Author model a name of type STRING
      name: DataTypes.STRING
    });
  
    Restaurant.associate = function(models) {
      // Associating Restaurants with Posts
      // When an Author is deleted, also delete any associated Posts
      Restaurant.hasMany(models.Post, {
        onDelete: "cascade"
      });
    };
  
    return Restaurant;
  };