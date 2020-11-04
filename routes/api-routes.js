// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db

// Dependencies
// =============================================================

// Requiring our models
// var db = require("../models");
// const Restaurant = require("../models/Restaurants.js");
var Restaurants = require("../models/Restaurants.js");
// Routes
// =============================================================
module.exports = function(app) {

  app.get("/api/all", function(req, res) {
    Restaurants.findAll({}).then(function(results) {
      res.json(results);
    });
  });

  app.post("/api/new", function(req, res) {
    console.log("Restuarants Data:");
    console.log(req.body);
    Restaurants.create({
      Restuarant: req.body.Name,
      Burger: 0,
      Comment: req.body.comment,
      // Fries: 0,
      // Beer: 0
    }).then(function(results) {
      res.json(results);
    });
  });

//   app.update("/api/update", function(req, res){
//  const Restaurantid = await User.create({ name: "Restuarant", age: 100, cash: 5000 });
//  await Restaurantid.increment({
//    'Burger': 1,
// //    'cash': 1
// //  });

// });

}