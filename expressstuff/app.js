require('dotenv').config()
const express = require('express')
const app = express()
const router =  require('./routes')
const jwt =  require('jsonwebtoken')
const helmet =  require('helmet')
const { restart } = require('nodemon')
//middleware
app.use(express.json())
app.use(helmet())

app.get('/', (req, res) => {
    console.log('service is running');
})

const posts = [
    {
        id: 1,
        username: 'ramiro',
        posts: ['postramiro1', 'postramior2']
    },
    {
        id: 2,
        username: 'laura',
        posts: ['postlaura1', 'postlaura2']
    }
]

app.use('/users', router.users)
app.use('/cars', router.cars)
app.get('/posts', authenticationRequired, (req, res) => {
    return res.send(posts.filter(x => x.username == req.user.username))
})

app.use((req, res, next) => {
    const error = new Error('An error occurred')
    error.status = 404
    next(error)
})
app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.send({
        error: {
            message: error.message
        }
    })
})
//middlewares
function authenticationRequired(req, res, next) {
    const authHeader = req.headers['authorization']
    if (!authHeader) return res.status(401).send('No authorization found')
    const token = authHeader.split(' ')[1]
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403).send('token couldnt be verified')
        req.user = user
        next()
    })  
} 

app.listen(3001, (err) => {
    if (err) console.log('error: ', err);
    console.log('service is listening on port 3001');
})
// 401 unauthorized
// 403 forbidden