var jwt = require("jsonwebtoken")

const express = require('express')
var router = express.Router()

function authenticateJWT(req, res, next) {
    jwt.verify(req.body.token, 'secretkey', (err, decoded) => {
        if (err) {
            res.status(401)
            return res.send("Not authorized")
        }
        console.log(decoded)
        next()
    })
}
//router.use()
router.get('/additionaltask/:id', (req, res, next) => {

    res.send("additionaltask:" + req.params.id + " " + req.query.something + " " + req.query.anotherthing)
})

router.post('/additionaltask/:id', authenticateJWT, (req, res, next) => {
    res.send("additionaltask:" + req.params.id + " " + JSON.stringify(req.body))
})

module.exports = router