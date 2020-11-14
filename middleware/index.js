const express = require('express')
const app = express()

//middleware
app.use(myLogger)

app.get('/', (req, res) => {
    console.log('root service');
    res.send({message: 'this is root'})
})
app.get('/users', (req, res) => {
    console.log('listing users');
    res.send({message: 'this is users'})
})
app.get('/posts', (req, res) => {
    console.log('listing posts');
    res.send({message: 'these are the posts'})
})

// middleware to handle errors
app.use((req, res, next) => {
    console.log('llegaste aqui');
})

function myLogger (req, res, next) {
    console.log('this is the middleware logging');
    next()
}

app.listen(3010, err => {
    if(err) console.log('error!');
    console.log('app listening on port 3010');
})