const express = require('express')
const PORT = process.env.PORT || 5000
const app = express()
const path = require('path')
var cors = require('cors')

app.use(cors(["localhost:5000", "localhost:3000"]))
app.use(express.json())

app.use('/', express.static(path.join(__dirname, 'web/build')))

// // never do this
// app.get('/create', (req, res) => {
//     res.send('here is your create')
// })

// app.get('/', (req, res) => {
//     res.send('Hello World!')
// })

let users = [];

app.get('/api/v1/profile', (req, res) => {
    res.send(users)
})
app.post('/api/v1/profile', (req, res) => {

    console.log(res.body)

    users.push({
        name: req.body.name,
        email: req.body.email,
        address: req.body.address
    })

    res.send('profile created')

})
app.put('/api/v1/profile', (req, res) => {
    res.send('profile updated')
})
app.delete('/api/v1/profile', (req, res) => {
    res.send('profile deleted')
})

app.get("/**", (req, res, next) => {
    // res.sendFile(path.join(__dirname, "./web/build/index.html"))
    res.redirect("/")
})

// app.use((req,res,next)=>{   
//     res.redirect("/404")
// })

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
})