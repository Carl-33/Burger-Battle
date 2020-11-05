const path = require("path");

module.exports = function(app) {
    
    app.get("/", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/burger.html"));
      });

      app.get("/burger", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/burger.html"));
      });

      app.get("/comments", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/comments.html"));
      });
}
