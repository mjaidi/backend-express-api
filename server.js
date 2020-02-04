// Main starting point of the application
const express = require("express");
const http = require("http"); // native node library
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");

const router = require("./router");

// DB Setup in another file
const sequelize = require("./mysqlConnection");

// App Setup (setting up express)
const app = express(); // instance of express
app.use(morgan("combined")); // middleware (logging framework)
app.use(cors()); // request coming in from anywhere allowed
app.use(bodyParser.json({ type: "*/*" })); // middleware - incoming requests will pass through these (parse requests into json)
router(app);

// Server Setup (getting express to talk to outside world )
const port = process.env.PORT || 3090;
const server = http.createServer(app); // forward http requests to express application
server.listen(port);
console.log("server listening on", port);
