const express = require('express')

const router =  express.Router()

// list
router.get('/', (req, res, next) => {
    res.send({message: 'listing cars'})
    next()
})

// change pass
router.get('/change_engine', (req, res, next) => {
    res.send({message: 'we have just changed engine'})
    next()
})

module.exports = router

