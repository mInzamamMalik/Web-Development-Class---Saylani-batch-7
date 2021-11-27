const express = require("express");

// we imported express and set up a new express 
// instance const app = express().
const app = express();
const port = 5000;


app.get("/", (request, response) => {
    response.send("Dashboard")
})

app.get("/about", (request, response) => {
    response.send("Welcome Abuot")
})


app.listen(port, () => console.log(`Your server is running on localhost:${port}`));