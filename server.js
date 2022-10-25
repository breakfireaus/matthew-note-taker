//dependencies
const express = require("express");
const apiRoutes = require("./routes/apiRoutes");
const htmlRoutes = require("./routes/htmlRoutes");
const path = require("path");


//express
const app = express();
app.use(express.static(path.join(__dirname, "/public")));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// linked routes 
app.use("/api", apiRoutes);
app.use("/", htmlRoutes);

module.exports = app;

//server port
const PORT = process.env.PORT || 3001;

app.listen(PORT, function () {
    console.log(`PORT ${PORT} is listening`);

});