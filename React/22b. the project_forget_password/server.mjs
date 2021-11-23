import express from 'express'
import mongoose from "mongoose"
import cors from "cors"
import path from "path";
import { createServer } from "http";
import { Server } from "socket.io";


const __dirname = path.resolve();
import {
    stringToHash,
    varifyHash
} from "bcrypt-inzi"
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import postmark from "postmark"


const SECRET = process.env.SECRET || "12345"
const POSTMARK_KEY = process.env.POSTMARK_KEY || "3fb0f0d2-8a71-44eb-aad9-45e8245f8b8c"
const PORT = process.env.PORT || 5001
const app = express()

let client = new postmark.ServerClient(POSTMARK_KEY);

mongoose.connect('mongodb+srv://dbuser:dbpassword@cluster0.nr4e4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');

const User = mongoose.model('User', {
    name: String,
    email: String,
    password: String,
    created: { type: Date, default: Date.now },
});
const Otp = mongoose.model('Otp', {
    email: String,
    otp: String,
    used: { type: Boolean, default: false },
    created: { type: Date, default: Date.now },
});
const Post = mongoose.model("Post", {
    postText: String,
    created: { type: Date, default: Date.now },

    userId: String,
    name: String,
    email: String,
})
app.use(express.json())
app.use(cookieParser())

app.use(cors({
    origin: ["http://localhost:3000", "http://localhost:5001"],
    credentials: true
}))

app.use('/', express.static(path.join(__dirname, 'web/build')))
app.get("/", (req, res, next) => {
    res.sendFile(path.join(__dirname, "./web/build/index.html"))
})


app.post('/api/v1/login', (req, res, next) => {

    if (!req.body.email ||
        !req.body.password
    ) {
        console.log("required field missing");
        res.status(403).send("required field missing");
        return;
    }
    console.log("req.body: ", req.body);

    User.findOne({ email: req.body.email }, (err, user) => {

        if (err) {
            res.status(500).send("error in getting database")
        } else {
            if (user) {

                varifyHash(req.body.password, user.password).then(result => {
                    if (result) {

                        var token = jwt.sign({
                            name: user.name,
                            email: user.email,
                            _id: user._id,
                        }, SECRET);
                        console.log("token created: ", token);

                        res.cookie("token", token, {
                            httpOnly: true,
                            // expires: (new Date().getTime + 300000), //5 minutes
                            maxAge: 300000
                        });

                        res.send({
                            name: user.name,
                            email: user.email,
                            _id: user._id,
                        });
                    } else {
                        res.status(401).send("Authentication fail");
                    }
                }).catch(e => {
                    console.log("error: ", e)
                })

            } else {
                res.send("user not found");
            }
        }
    })
})

app.post('/api/v1/signup', (req, res, next) => {

    if (!req.body.email ||
        !req.body.password ||
        !req.body.name
    ) {
        console.log("required field missing");
        res.status(403).send("required field missing");
        return;
    } else {

        User.findOne({ email: req.body.email }, (err, user) => {
            if (user) {
                res.send("user already exist");
            } else {
                console.log(req.body)

                stringToHash(req.body.password).then(passwordHash => {
                    console.log("hash: ", passwordHash);

                    let newUser = new User({
                        name: req.body.name,
                        email: req.body.email,
                        password: passwordHash,
                    })
                    newUser.save(() => {
                        console.log("data saved")
                        res.send('signup success')
                    })
                })
            }
        })
    }

})

app.post('/api/v1/otp', (req, res, next) => {

    if (!req.body.email) {
        console.log("required field missing");
        res.status(403).send("required field missing");
        return;
    }
    console.log("req.body: ", req.body);

    User.findOne({ email: req.body.email }, (err, user) => {

        if (err) {
            res.status(500).send("error in getting database")
        } else {
            if (user) {

                function getRandomArbitrary(min, max) {
                    return Math.random() * (max - min) + min;
                }
                const otp = getRandomArbitrary(11111, 99999).toFixed(0);

                stringToHash(otp).then(hash => {

                    let newOtp = new Otp({
                        email: req.body.email,
                        otp: hash
                    })
                    newOtp.save((err, saved) => {
                        if (!err) {

                            client.sendEmail({
                                "From": "info@sysborg.com",
                                "To": req.body.email,
                                "Subject": "forget password OTP",
                                "TextBody": `Hi ${user.name}, your 5 digit OTP is: ${otp}`
                            }).then((success, error) => {
                                if (!success) {
                                    console.log("postmark error: ", error)
                                }
                            });

                            res.send({ otpSent: true, message: "otp genrated" });
                        } else {
                            console.log("error: ", err);
                            res.status(500).send("error saving otp on server")
                        }
                    })
                })

            } else {
                res.send("user not found");
            }
        }
    })
})
app.post('/api/v1/forget', (req, res, next) => {

    if (!req.body.email || !req.body.otp || !req.body.newPassword) {
        console.log("required field missing");
        res.status(403).send("required field missing");
        return;
    }
    console.log("req.body: ", req.body);

    Otp.findOne({ email: req.body.email })
        .sort({ _id: -1 })
        .exec((err, otp) => {

            if (err) {
                res.status(500).send("error in getting database")
            } else {
                if (otp) {

                    const created = new Date(otp.created).getTime;
                    const now = new Date().getTime;
                    const diff = now - created

                    if (diff > 300000 || otp.used) {
                        res.status(401).send("otp not valid");
                    } else {
                        varifyHash(req.body.otp, otp.otp).then(isMatch => {
                            if (isMatch) {

                                stringToHash(req.body.newPassword).then((hashPassword) => {
                                    User.findOneAndUpdate(
                                        { email: req.body.email },
                                        { password: hashPassword },
                                        {},
                                        (err, updated) => {
                                            if (!err) {
                                                res.send("password updated");
                                            } else {
                                                res.status(500).send("error updating user")
                                            }
                                        })
                                })
                                otp.update({ used: true })
                                    .exec((err, updated) => {
                                        if (!err) {
                                            console.log("otp updated")
                                        } else {
                                            console.log("otp update fail: ", err)
                                        }
                                    })

                            } else {
                                res.status(401).send("otp not valid")
                            }
                        })
                    }
                } else {
                    res.status(400).send("invalid otp");
                }
            }
        })
})

app.use((req, res, next) => {

    jwt.verify(req.cookies.token, SECRET,
        function (err, decoded) {

            req.body._decoded = decoded;

            console.log("decoded: ", decoded) // bar

            if (!err) {
                next();
            } else {
                res.status(401).sendFile(path.join(__dirname, "./web/build/index.html"))
            }

        })

});

app.post('/api/v1/logout', (req, res, next) => {
    res.cookie("token", "", {
        httpOnly: true,
        maxAge: 300000
    });
    res.send();
})

app.get('/api/v1/profile', (req, res) => {
    User.findOne({ email: req.body._decoded.email }, (err, user) => {

        if (err) {
            res.status(500).send("error in getting database")
        } else {
            if (user) {
                res.send({
                    name: user.name,
                    email: user.email,
                    _id: user._id,
                });
            } else {
                res.send("user not found");
            }
        }
    })
})
app.post('/api/v1/profile', (req, res) => {
    res.send('profile created')
})
app.put('/api/v1/profile', (req, res) => {
    res.send('profile updated')
})
app.delete('/api/v1/profile', (req, res) => {
    res.send('profile deleted')
})

app.post("/api/v1/post", (req, res) => {
    const newPost = new Post({
        postText: req.body.postText,
        userId: req.body._decoded._id,
        name: req.body._decoded.name,
        email: req.body._decoded.email
    });
    newPost.save().then(() => {
        console.log("Post created");

        io.emit("POSTS", {
            postText: req.body.postText,
            userId: req.body._decoded._id,
            name: req.body._decoded.name,
            email: req.body._decoded.email
        });

        res.send("Post created");
    });
});

app.delete("/api/v1/post", (req, res) => {
    Post.deleteOne({ _id: req.body.id, userId: req.body._decoded._id }, (err, data) => {
        res.send("Post deleted");
    });
});

app.put("/api/v1/post", (req, res) => {
    Post.updateOne({
        _id: req.body.id,
        userId: req.body._decoded._id
    }, {
        postText: req.body.postText
    }, (err, data) => {
        res.send("Post deleted");
    });
});

app.get("/api/v1/posts", (req, res) => {

    const page = Number(req.query.page);

    console.log("page: ", page);

    Post.find({})
        .sort({ created: "desc" })
        .skip(page)
        .limit(2)
        .exec(function (err, data) {
            res.send(data);
        });
});

app.get("/**", (req, res, next) => {
    res.sendFile(path.join(__dirname, "./web/build/index.html"))
    // res.redirect("/")
})

// app.listen(PORT, () => {
//     console.log(`Example app listening at http://localhost:${PORT}`)
// })

const server = createServer(app);

const io = new Server(server, { cors: { origin: "*", methods: "*", } });

io.on("connection", (socket) => {
    console.log("New client connected with id: ", socket.id);

    // to emit data to a certain client
    socket.emit("topic 1", "some data")

    // collecting connected users in a array
    // connectedUsers.push(socket)

    socket.on("disconnect", (message) => {
        console.log("Client disconnected with id: ", message);
    });
});


setInterval(() => {

    // to emit data to all connected client
    // first param is topic name and second is json data
    io.emit("Test topic", { event: "ADDED_ITEM", data: "some data" });
    console.log("emiting data to all client");

}, 2000)


server.listen(PORT, function () {
    console.log("server is running on", PORT);
})