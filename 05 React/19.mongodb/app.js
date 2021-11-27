const express = require('express')
const PORT = process.env.PORT || 5000
const app = express()
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://dbuser:dbpassword@cluster0.nr4e4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');


const User = mongoose.model('User', {
    name: String,
    email: String,
    address: String,
    created: { type: String, default: Date.now },
});



app.use(express.json())

app.get('/api/v1/profile', (req, res) => {

    User.find({}, (err, data) => {

        if(err){
            res.status(500).send("error in getting database")
        }else{
            res.send(data)
        }

    })
})
app.post('/api/v1/profile', (req, res) => {

    console.log(req.body)

    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        address: req.body.address,
    })
    newUser.save(() => {
        console.log("data saved")
        res.send('profile created')
    })

})
app.put('/api/v1/profile', (req, res) => {
    res.send('profile updated')
})
app.delete('/api/v1/profile', (req, res) => {
    res.send('profile deleted')
})

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
})