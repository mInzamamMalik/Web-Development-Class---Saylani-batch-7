const express = require("express");
const mongoose = require("mongoose");
const postModel = require("./schema");
const userModel = require("./userSchema");
const cors = require("cors");

// we imported express and set up a new express 
// instance const app = express().
const app = express();
const v1auth = require("./routes/v1authRoutes");
const auth = require("./routes/authRoutes");

const port = 5000;
// allow body
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(cors({
    origin: 'http://twitter.com'
}));

const DB_URI = "mongodb+srv://admin:admin@cluster0.x26vs.mongodb.net/dev";

mongoose.connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use("/file", express.static("./static"))

app.use("/v1", v1auth)
app.use("/v2", auth)

app.post("/registration", (request, response) => {
    try {
        const body = request.body;
        userModel.findOne({ email: body.email }, (error, user) => {
            if (error) {
                throw error;
            }
            if (user) {
                response.send("Email Already exist")
            } else {
                userModel.create(body, (error, data) => {
                    if (error) {
                        response.send(error.message)
                    } else {
                        response.send("Account Created");
                    }
                });
            }
        })
    } catch (error) {
        response.send(`Got an error `, error.message);
    }
});
app.post("/login", (request, response) => {
    try {
        const body = request.body;
        userModel.findOne({ email: body.email }, (error, user) => {
            if (error) {
                throw error;
            }
            if (user) {
                response.send(user);
            }
            if (!user) {
                response.send(`Account not found ${body.email}`);
            }
        })
    } catch (error) {
        response.send(`Got an error `, error.message);
    }
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
        const { title } = request.headers;
        const query = {};
        if (title) {
            query.title = title;
        }
        postModel.find(query, (error, data) => {
            if (error) {
                throw error;
            } else {
                response.send(JSON.stringify(data));
            }
        });
    } catch (error) {
        response.send(`Got an error during get posts `, error.message);
    }
});
app.get("/getapost", (request, response) => {
    try {
        const { title } = request.headers;
        const query = {
            title: title
        };
        if (query.title) {
            postModel.findOne(query, (error, data) => {
                if (error) {
                    throw error;
                } else {
                    response.send(JSON.stringify(data));
                }
            });
        } else {
            response.send(`Filed missing `);
        }
    } catch (error) {
        response.send(`Got an error during get a post `, error.message);
    }
});

// twitter.com/username/345351234234?name=john&class=metric
app.get("/tweet/:id", (request, response) => {
    request.params.id
    request.query.name
    request.query.class
})
app.get("/tweets", (request, response) => {
    response.send({
        tweerText: "ggdhdffghfgfe"
    })
});
app.post("/tweet", (request, response) => {
    response.send({
        tweerText: "ggdhdffghfgfe"
    })
});
app.put("/tweet", (request, response) => {
    response.send({
        tweerText: "ggdhdffghfgfe"
    })
});
app.delete("/tweet", (request, response) => {
    response.send({
        tweerText: "ggdhdffghfgfe"
    })
});

app.get("/user", (request, response) => {
    response.send({
        tweerText: "ggdhdffghfgfe"
    })
});
app.post("/user", (request, response) => {
    response.send({
        tweerText: "ggdhdffghfgfe"
    })
});
app.put("/user", (request, response) => {
    response.send({
        tweerText: "ggdhdffghfgfe"
    })
});
app.delete("/user", (request, response) => {
    response.send({
        tweerText: "ggdhdffghfgfe"
    })
});

mongoose.connection.on("connected", () => console.log("mongoose connected"));
mongoose.connection.on("error", (error) => console.log(`mongoose error ${error.message}`));

app.listen(port, () => console.log(`Your server is running on localhost:${port}`));