const express = require('express')


const app = express()

app.use(express.json())

app.post('/user/signup', (req, res) => {

})

app.post('/user/signin', (req, res) => {

})

app.get('/user/purchases', (req, res) => {

})

app.post("/course/purchase", (req, res) => {

});

app.get('/course/preview', (req, res) => {

})

app.post('/admin/signup', (req, res) => {

})

app.post('/admin/createcourse', (req, res) => {

})

app.delete('/admin/deletecourse', (req, res) => {

})

app.post('/admin/addcontent', (req, res) => {

})

app.listen(3000)