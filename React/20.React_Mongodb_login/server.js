const express = require('express')
const PORT = process.env.PORT || 5000
const app = express()
const mongoose = require('mongoose');
const cors = require("cors");

mongoose.connect('mongodb+srv://dbuser:dbpassword@cluster0.nr4e4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');


const User = mongoose.model('User', {
    name: String,
    email: String,
    password: String,
    created: { type: Date, default: Date.now },
});


app.use(express.json())
app.use(cors(["localhost:3000", "localhost:5000"]))

app.post('/api/v1/login', (req, res) => {

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

                if (user.password === req.body.password) {
                    res.send(user);

                } else {
                    res.send("Authentication fail");
                }

            } else {
                res.send("user not found");
            }
        }

    })
})
app.post('/api/v1/signup', (req, res) => {

    if (!req.body.email ||
        !req.body.password ||
        !req.body.name
    ) {
        console.log("required field missing");
        res.status(403).send("required field missing");
        return;
    } else {

        console.log(req.body)

        let newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        })
        newUser.save(() => {
            console.log("data saved")
            res.send('profile created')
        })
    }

})

app.delete('/api/v1/profile', (req, res) => {
    res.send('profile deleted')
})

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
})