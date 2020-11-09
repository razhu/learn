const express = require('express')

const router =  express.Router()

// list
router.get('/', (req, res, next) => {
    res.send({message: 'listing users'})
    next()
})

// change pass
router.get('/change_user_pass', (req, res, next) => {
    res.send({message: 'we have just changed user pass'})
    next()
})

module.exports = router