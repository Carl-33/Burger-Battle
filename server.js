// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
let express = require("express");

// Sets up the Express App
// =============================================================
let app = express();
let PORT = process.env.PORT || 8060;

// Requiring our models for syncing
// var db = require("./models");

// Static directory
app.use(express.static("public"));

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Routes
// =============================================================
// What does this do?
let routes = require("./controllers/burgerController.js");

app.use(routes);
// require("./routes/html-routes.js")(app);
// require("./routes/author-api-routes.js")(app);
require("./routes/api-routes.js")(app);

// Syncing our sequelize models and then starting our Express app
// =============================================================
// 
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});

// db.sequelize.sync({ force: true }).then(function() {
//   app.listen(PORT, function() {
//     console.log("App listening on PORT " + PORT);
//   });
// });