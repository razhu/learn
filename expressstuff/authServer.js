require('dotenv').config()
const jwt =  require('jsonwebtoken')
const express = require('express')
const app =  express()
const helmet =  require('helmet')

app.use(express.json())
app.use(helmet())
// this should have been stored ona db but for learning purposes will do it in a json
let refreshTokens = []

app.post('/login', (req, res) => {
    const user = {username: req.body.username, address: req.body.address}
    const accessToken = generateAccessToken(user) // this one has expiration date
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET) // this one doesnt have expiration date
    refreshTokens.push(refreshToken)
    return res.send({
        token: accessToken,
        refreshToken
    })
})
app.delete('/logout', (req, res) => {
    refreshTokens = refreshTokens.filter(token => token !== req.body.token)
    res.sendStatus(204)
  })
// generate token with refreshtoken
app.post('/token', (req, res) => {
    const rtoken = req.body.token
    if (!rtoken) return res.status(401).send({message: 'not authorized'})
    if (!refreshTokens.includes(rtoken)) return res.status(403).send({message: 'token not recognized'})
    jwt.verify(rtoken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403).send({error: err})
        console.log('user /token ', user);
        return res.send({token: generateAccessToken({username: user.username, address: user.address})})
    })
})
// logout and kill refrefreshtoken too


function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '30s'})
}

app.listen(4000, (err) => {
    if (err) console.log('theres an error');
    console.log('auth server running on port 4000');
})