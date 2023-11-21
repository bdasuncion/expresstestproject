const express = require("express")
var router = express.Router()

var jwt = require("jsonwebtoken")

function authenticateBasic(req, res, next) {
    var authorization = getBase64UsernameAndPasswordFromHeaderValue(req.get('Authorization'))
    
    if(!authorization) {
        res.status(401)
        return res.send('Error')
    }

    var loginInfo = getUsernameAndPasswordFromBase64(authorization)
    if (loginInfo.username != 'bryan' || loginInfo.password != 'password') {
        res.status(401)
        return res.send('Error')
    }
    next()
}

function getBase64UsernameAndPasswordFromHeaderValue(authorization) {
    if(!authorization) {
        return null
    }
    var authorizationTypeAndValue = authorization.split(' ')
    if (authorizationTypeAndValue[0 != 'basic']) {
        return null
    }
    return authorizationTypeAndValue[1]
}

function getUsernameAndPasswordFromBase64(data) {
    var usernameAndPassword = Buffer.from(data, 'base64').toString('utf-8').split(':')
    console.log(usernameAndPassword[0] + " " + usernameAndPassword[1])
    return { username: usernameAndPassword[0], password: usernameAndPassword[1]}
}

router.post('/login', authenticateBasic, (req, res, next) => {
    var authorization = getBase64UsernameAndPasswordFromHeaderValue(req.get('Authorization'))
    var loginInfo = getUsernameAndPasswordFromBase64(authorization)
    var token = jwt.sign({ username: loginInfo.username, time: Date.now()}, 'secretkey', {expiresIn:120})
    res.send(token)
})

module.exports = router



