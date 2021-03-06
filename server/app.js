require("dotenv").config();

var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var sequelize = require("./db.js");
var User = sequelize.import("./models/user");



// chagned the following from User.sync to sequelize.sync at the end of module 18, per screen shots, to fix internal server error
sequelize.sync();   //call the sequelize method on the User object... this line of code creates a table in postgres and matches the model we defined. (doesn't drop the DB)
// User.sync({force:true})  //this will drop the table completely, should we ever need to do so. Must comment out User.sync() at the same time

app.use(bodyParser.json());  //tell the application to use bodyParser. Will take data off incoming requests and turn it into JSON. It will take that JSON and expose it to be used for req.body





app.use(require("./middleware/headers"));  //will pull the headers module, which we've made to allow cross origin requests to this server.
app.use(require("./middleware/validate-session"));
app.use("/api/user", require("./routes/user"));
//login route
app.use("/api/login", require("./routes/session"));
app.use("/api/definition", require("./routes/definition"));
app.use("/api/log", require("./routes/log"));





app.use("/api/test", function(req, res) {
	res.send("Hello World!");
});






app.listen(3000, function() {
	console.log("app is listening on 3000");
});








