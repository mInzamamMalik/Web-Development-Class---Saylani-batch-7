const express = require("express");
const mongoose = require("mongoose");
const postModel = require("./schema");

// we imported express and set up a new express 
// instance const app = express().
const app = express();
const port = 5000;
// allow body
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

const DB_URI = "mongodb+srv://admin:admin@cluster0.x26vs.mongodb.net/dev";

mongoose.connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});


app.post("/create", (request, response) => {
    try {
        const body = request.body;
        postModel.create(body, (error, data) => {
            if (error) {
                throw error;
            } else {
                console.log(data);
                response.send("Create post successfully");
            }
        });
    } catch (error) {
        response.send(`Got an error `, error.message);
    }
});

app.get("/posts", (request, response) => {
    try {
        const body = request.body;
        console.log(body);
        postModel.find({}, (error, data) => {
            if (error) {
                throw error;
            } else {
                response.send(data);
            }
        });
    } catch (error) {
        response.send(`Got an error during get posts `, error.message);
    }
});




mongoose.connection.on("connected", () => console.log("mongoose connected"));
mongoose.connection.on("error", (error) => console.log(`mongoose error ${error.message}`));

app.listen(port, () => console.log(`Your server is running on localhost:${port}`));