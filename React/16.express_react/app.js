const express = require('express')
const PORT = process.env.PORT || 5000
const app = express()
const path = require('path')


app.use('/', express.static(path.join(__dirname, 'web/build')))


// app.get('/', (req, res) => {
//     res.send('Hello World!')
// })

app.get('/api/v1/profile', (req, res) => {
    res.send('here is your profile')
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

app.get("/**", (req, res, next) => {
    res.sendFile(path.join(__dirname, "./web/build/index.html"))
})

// app.use((req,res,next)=>{   
//     res.redirect("/404")
// })

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
})