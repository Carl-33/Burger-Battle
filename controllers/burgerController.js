var express = require("express");

var router = express.Router();


// create our route
router.get("/", function(req, res) {
        console.log("party")
      res.render("index");
    });
  

    module.exports = router;