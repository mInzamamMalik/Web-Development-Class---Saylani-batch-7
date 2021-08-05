const express = require("express");
const mongoose = require("mongoose");
const postModel = require("./schema");

// we imported express and set up a new express 
// instance const app = express().
const app = express();
const port = 5000;

const DB_URI = "mongodb+srv://admin:admin@cluster0.x26vs.mongodb.net/dev";

mongoose.connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});


app.get("/add", (request, response) => {
    postModel.create({ title: "HBD" }, (error, data) => {
        if (error) {
            response.send(error.message);
        } else {
            console.log(data);
            response.send("Success")
        }
    });




    // console.log("headers ", request.headers);
    // response.send("Dashboard")
});




mongoose.connection.on("connected", () => console.log("mongoose connected"));
mongoose.connection.on("error", (error) => console.log(`mongoose error ${error.message}`));

app.listen(port, () => console.log(`Your server is running on localhost:${port}`));