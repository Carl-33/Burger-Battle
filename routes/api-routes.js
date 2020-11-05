// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db

// Dependencies
// =============================================================

// Requiring our models
// var db = require("../models");
// const Restaurant = require("../models/Restaurants.js");
var Restaurants = require("../models/Restaurants.js");
var Sequelize = require("sequelize");
// Routes
// =============================================================
module.exports = function(app) {

  app.get("/api/restaurant", function(req, res) {
    Restaurants.findAll({}).then(function(results) {
      res.json(results);
    });
  });

  app.get("/api/restaurant/:name", function(req, res) {
    const Name = req.params.name;
    Restaurants.findOne({
      where: {
        Name
      }
    }).then(result => {
      res.json(result);
    }).catch(() => {
      res.sendStatus(404);
    })
  })

  app.post("/api/restaurant", function(req, res) {
    console.log("Restuarants Data:");
    console.log(req.body);
    Restaurants.create({
      Name: req.body.Name,
      Score: 0,
      // Comment: req.body.comment,
      // Fries: 0,
      // Beer: 0
    }).then(function(results) {
      res.json(results);
    }).catch(function() {
      res.sendStatus(404);
    })
  });

  app.put("/api/restaurant/:id", function(req, res) {
    const id = req.params.id;
    Restaurants.update({ Score: Sequelize.literal('Score + 1') }, { where: { id: id } })
      .then(function() {
        res.sendStatus(200);
      }).catch(function() {
        res.sendStatus(400);
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